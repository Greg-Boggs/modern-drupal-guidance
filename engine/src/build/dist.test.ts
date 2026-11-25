/**
 * Checks the fixture package that scripts/run-tests.ts builds into dist/fixtures-cli
 * (MDG_FIXTURES_DIST). Runs the bundled CLI the way an agent would.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { rootDir } from '../core/paths.ts';

const distDir = process.env.MDG_FIXTURES_DIST || path.join(rootDir, 'dist/fixtures-cli');
const skillDir = path.join(distDir, 'skills/modern-drupal-guidance');
const cli = path.join(skillDir, 'modern-drupal-guidance.mjs');
const json = (rel: string) => JSON.parse(fs.readFileSync(path.join(distDir, rel), 'utf8'));

function run(args: string[], opts: { cwd?: string; env?: Record<string, string | undefined> } = {}) {
  // A clean env: the bundle must not depend on MDG_* variables the test runner sets.
  const env: Record<string, string | undefined> = { PATH: process.env.PATH, HOME: process.env.HOME, NO_COLOR: '1', ...opts.env };
  return spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8', cwd: opts.cwd ?? os.tmpdir(), env });
}

test('package layout', () => {
  for (const rel of [
    'package.json', 'LICENSE', 'NOTICE', 'README.md', 'THIRD_PARTY_NOTICES',
    '.claude-plugin/plugin.json', '.claude-plugin/marketplace.json', '.codex-plugin/plugin.json',
    '.cursor-plugin/plugin.json', '.github/plugin/plugin.json', '.grok-plugin/marketplace.json',
    '.agents/plugins/marketplace.json', 'gemini-extension.json', 'kimi.plugin.json', 'plugin.json',
    'skills/modern-drupal-guidance/SKILL.md', 'skills/modern-drupal-guidance/skill-version.txt',
    'skills/modern-drupal-guidance/search.mjs', 'skills/modern-drupal-guidance/legacy-scan.mjs',
    'skills/modern-drupal-guidance/gen/guides.json', 'skills/modern-drupal-guidance/gen/query-words.json',
  ]) {
    assert.ok(fs.existsSync(path.join(distDir, rel)), rel);
  }
  assert.ok(!fs.existsSync(path.join(skillDir, '.cache')));
  assert.equal(json('package.json').bin['modern-drupal-guidance'], 'skills/modern-drupal-guidance/modern-drupal-guidance.mjs');
});

test('manifests are rebranded and consistent', () => {
  const manifests = ['package.json', '.claude-plugin/plugin.json', '.codex-plugin/plugin.json', '.cursor-plugin/plugin.json',
    '.github/plugin/plugin.json', 'gemini-extension.json', 'kimi.plugin.json', 'plugin.json'];
  for (const rel of manifests) {
    const m = json(rel);
    assert.equal(m.name, 'modern-drupal-guidance', rel);
    assert.doesNotMatch(JSON.stringify(m), /google|chrome|modern-web/i, rel);
  }
  for (const rel of ['.claude-plugin/marketplace.json', '.grok-plugin/marketplace.json', '.agents/plugins/marketplace.json']) {
    const m = json(rel);
    assert.equal(m.plugins[0].name, 'modern-drupal-guidance', rel);
    assert.doesNotMatch(JSON.stringify(m), /google|chrome/i, rel);
  }
  for (const skillsPath of [json('kimi.plugin.json').skills[0], json('.codex-plugin/plugin.json').skills]) {
    assert.ok(fs.existsSync(path.join(distDir, skillsPath)), skillsPath);
  }
});

test('SKILL.md is the Drupal skill with its version stamped in', () => {
  const skill = fs.readFileSync(path.join(skillDir, 'SKILL.md'), 'utf8');
  const version = fs.readFileSync(path.join(skillDir, 'skill-version.txt'), 'utf8').trim();
  assert.match(skill, /^---\nname: modern-drupal-guidance\n/);
  assert.match(skill, /Twig/);
  assert.match(skill, /## Target core version policy/);
  assert.ok(skill.includes(`--skill-version ${version}`));
  assert.ok(!skill.includes('SKILL_VERSION'));
  assert.doesNotMatch(skill, /Baseline|browser support/i);
});

test('bundled CLI: search, list, retrieve', () => {
  const search = run(['search', 'cache tags render array']);
  assert.equal(search.status, 0, search.stderr);
  const results = JSON.parse(search.stdout);
  assert.equal(results[0].id, 'fixture-cache-tags');
  assert.deepEqual(Object.keys(results[0]), ['id', 'description']);

  const list = run(['list']);
  const catalog = JSON.parse(list.stdout);
  assert.equal(catalog.length, 3);
  assert.equal(list.stdout.trim().split('\n').length, 3, 'one compact JSON object per line');

  const retrieve = run(['retrieve', 'fixture-oop-hooks,fixture-sdc-card']);
  assert.equal(retrieve.status, 0, retrieve.stderr);
  assert.ok(retrieve.stdout.includes('--- Guide for fixture-oop-hooks ---'));
  assert.ok(retrieve.stdout.includes('--- Guide for fixture-sdc-card ---'));
  assert.ok(retrieve.stdout.includes('**Drupal core:** 11.1 and later (`>=11.1`).'));

  const missing = run(['retrieve', 'nope']);
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /Retrieve failed for nope: No guide found/);
});

test('bundled CLI: set-core and target', (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mdg-dist-core-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.mkdirSync(path.join(dir, '.git'));
  assert.equal(JSON.parse(run(['target', '--json'], { cwd: dir }).stdout), null);
  assert.equal(run(['set-core', 'banana'], { cwd: dir }).status, 1);
  assert.equal(run(['set-core', '10.4'], { cwd: dir }).status, 0);
  assert.deepEqual(JSON.parse(run(['target', '--json'], { cwd: dir }).stdout), {
    drupalCore: '10.4', source: '.mdgrc', file: path.join(dir, '.mdgrc'),
  });
  const out = run(['retrieve', 'fixture-oop-hooks'], { cwd: dir }).stdout;
  assert.match(out, /Project target: Drupal core 10\.4\*\* \(from `\.mdgrc`\) is older than this guide's range/);
});

test('bundled CLI: version, help, legacy-scan', () => {
  assert.match(run(['--version']).stdout.trim(), /^\d+\.\d+\.\d+/);
  const help = run(['--help']);
  assert.equal(help.status, 0);
  assert.match(help.stdout, /Usage: modern-drupal-guidance <command>/);
  const scan = run(['legacy-scan', os.tmpdir(), '--json', '--max-files', '1']);
  assert.equal(scan.status, 0, scan.stderr);
  assert.equal(JSON.parse(scan.stdout).totalFindings, 0);
});

test('bundles do not leak the build machine path', () => {
  for (const f of ['modern-drupal-guidance.mjs', 'search.mjs', 'legacy-scan.mjs']) {
    assert.ok(!fs.readFileSync(path.join(skillDir, f), 'utf8').includes(rootDir), f);
  }
});
