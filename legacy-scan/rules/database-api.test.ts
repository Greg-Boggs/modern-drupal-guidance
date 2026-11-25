import assert from 'node:assert/strict';
import test from 'node:test';
import { scanSource } from '../scanners/index.ts';
import { dbFunctionRule } from './database-api.ts';

const scan = (code: string, path = 'mymod/mymod.module') => scanSource(path, code, [dbFunctionRule]);

void test('database-api: true positives', async (t) => {
  await t.test('flags query wrappers with Connection replacements', () => {
    const f = scan(`<?php
function mymod_count() {
  $n = db_query('SELECT COUNT(*) FROM {node}')->fetchField();
  $q = db_select('node', 'n')->fields('n');
  db_insert('mymod_log')->fields(['x' => 1])->execute();
  $like = db_like($text);
}
`);
    assert.deepEqual(f.map((x) => x.line), [3, 4, 5, 6]);
    assert.match(f[1]?.message ?? '', /\$connection->select\(\)/);
    assert.match(f[3]?.message ?? '', /escapeLike/);
  });

  await t.test('flags schema wrappers in .install files', () => {
    const f = scan(`<?php
function mymod_update_9001() {
  if (!db_field_exists('mymod_log', 'uid')) {
    db_add_field('mymod_log', 'uid', ['type' => 'int']);
  }
}
`, 'mymod/mymod.install');
    assert.equal(f.length, 2);
    assert.equal(f[0]?.subPattern, 'schema');
    assert.match(f[1]?.message ?? '', /schema\(\)->addField\(\)/);
  });
});

void test('database-api: look-alike negatives', async (t) => {
  await t.test('skips custom db_ helpers not in the core list', () => {
    assert.equal(scan(`<?php
function db_helper_cleanup() {}
db_helper_cleanup();
$x = mymod_db_query();
`).length, 0);
  });

  await t.test('skips method calls named like the wrappers', () => {
    assert.equal(scan(`<?php
$this->connection->query('SELECT 1');
$legacy->db_query('x');
Database::getConnection()->select('node');
`).length, 0);
  });

  await t.test('skips function_exists guards', () => {
    assert.equal(scan(`<?php
if (function_exists('db_query')) { db_query('SELECT 1'); }
`).length, 0);
  });
});
