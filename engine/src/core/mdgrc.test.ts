import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { normalizeCoreTarget, readMdgrc, writeMdgrc, resolveCoreTarget } from './mdgrc.ts';

function project(t: import('node:test').TestContext, files: Record<string, unknown>): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mdgrc-test-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.mkdirSync(path.join(dir, '.git'));
  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, name), typeof content === 'string' ? content : JSON.stringify(content));
  }
  return dir;
}

describe('normalizeCoreTarget', () => {
  it('normalizes versions and rejects junk', () => {
    assert.equal(normalizeCoreTarget('10.3'), '10.3');
    assert.equal(normalizeCoreTarget('11'), '11.0');
    assert.equal(normalizeCoreTarget('v10.3.2'), '10.3.2');
    assert.equal(normalizeCoreTarget('7'), undefined);
    assert.equal(normalizeCoreTarget('latest'), undefined);
    assert.equal(normalizeCoreTarget(''), undefined);
  });
});

describe('resolveCoreTarget', () => {
  it('prefers .mdgrc, then composer.lock, then composer.json', (t) => {
    const lock = { packages: [{ name: 'drupal/core', version: '11.1.4' }] };
    const json = { require: { 'drupal/core-recommended': '^10.3 || ^11' } };

    const all = project(t, { '.mdgrc': { drupalCore: '10.4' }, 'composer.lock': lock, 'composer.json': json });
    assert.deepEqual(resolveCoreTarget(all)?.display, '10.4');
    assert.equal(resolveCoreTarget(all)?.source, '.mdgrc');

    const lockOnly = project(t, { 'composer.lock': lock, 'composer.json': json });
    assert.equal(resolveCoreTarget(lockOnly)?.display, '11.1.4');
    assert.equal(resolveCoreTarget(lockOnly)?.source, 'composer.lock');

    const jsonOnly = project(t, { 'composer.json': json });
    assert.equal(resolveCoreTarget(jsonOnly)?.display, '10.3');
    assert.equal(resolveCoreTarget(jsonOnly)?.source, 'composer.json');

    assert.equal(resolveCoreTarget(project(t, {})), null);
  });

  it('finds the project root from a subdirectory', (t) => {
    const dir = project(t, { 'composer.json': { require: { 'drupal/core': '>=11.1' } } });
    const sub = path.join(dir, 'web', 'modules', 'custom');
    fs.mkdirSync(sub, { recursive: true });
    assert.equal(resolveCoreTarget(sub)?.display, '11.1');
  });

  it('writes and merges .mdgrc', (t) => {
    const dir = project(t, { '.mdgrc': { other: true } });
    const p = writeMdgrc({ drupalCore: '11.1' }, dir);
    assert.equal(p, path.join(dir, '.mdgrc'));
    assert.deepEqual(readMdgrc(dir), { other: true, drupalCore: '11.1' });
  });
});
