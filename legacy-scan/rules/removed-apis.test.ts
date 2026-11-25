import assert from 'node:assert/strict';
import test from 'node:test';
import { scanSource } from '../scanners/index.ts';
import { removedFunctionRule } from './removed-apis.ts';

const scan = (code: string, path = 'mymod/mymod.module') => scanSource(path, code, [removedFunctionRule]);

void test('removed-apis: true positives', async (t) => {
  await t.test('flags drupal_set_message with its replacement and version', () => {
    const f = scan(`<?php
function mymod_cron() {
  drupal_set_message(t('Done'));
}
`);
    assert.equal(f.length, 1);
    assert.equal(f[0]?.line, 3);
    assert.match(f[0]?.message ?? '', /removed in Drupal 9\.0.*messenger/);
  });

  await t.test('flags fully-qualified and mixed-case calls in classes', () => {
    const f = scan(`<?php
namespace Drupal\\mymod;
class X {
  public function y() {
    $path = \\drupal_get_path('module', 'mymod');
    $url = File_Create_Url($uri);
    $size = format_size(1024);
  }
}`, 'mymod/src/X.php');
    assert.deepEqual(f.map((x) => x.subPattern), ['drupal_get_path', 'file_create_url', 'format_size']);
    assert.match(f[2]?.message ?? '', /11\.0.*ByteSizeMarkup/);
  });

  await t.test('flags removed \\Drupal:: methods', () => {
    const f = scan(`<?php
$link = \\Drupal::l('Home', $url);
$em = \\Drupal::entityManager();
`);
    assert.deepEqual(f.map((x) => x.subPattern), ['Drupal::l', 'Drupal::entityManager']);
  });

  await t.test('labels Drupal 7 APIs as such', () => {
    const f = scan(`<?php
$x = check_plain($title);
`);
    assert.match(f[0]?.message ?? '', /Drupal 7 API/);
  });
});

void test('removed-apis: look-alike negatives', async (t) => {
  await t.test('skips method calls with the same name', () => {
    assert.equal(scan(`<?php
$this->messenger->drupal_set_message('x');
$renderer->render($build);
$storage->load(1);
$this->entity_load();
MyClass::format_date();
`).length, 0);
  });

  await t.test('skips declarations of BC shims', () => {
    assert.equal(scan(`<?php
function drupal_set_message($message = NULL) {}
function render(&$element) {}
`).length, 0);
  });

  await t.test('skips calls guarded by function_exists()', () => {
    assert.equal(scan(`<?php
if (function_exists('drupal_get_path')) {
  $p = drupal_get_path('module', 'x');
}
`).length, 0);
  });

  await t.test('skips functions that still exist (user_load_by_name, drupal_static)', () => {
    assert.equal(scan(`<?php
$a = user_load_by_name('admin');
$b = &drupal_static(__FUNCTION__);
$c = \\Drupal::entityTypeManager();
`).length, 0);
  });

  await t.test('skips strings and comments mentioning removed functions', () => {
    assert.equal(scan(`<?php
// drupal_set_message() was removed.
$msg = 'Use the messenger instead of drupal_set_message()';
`).length, 0);
  });
});
