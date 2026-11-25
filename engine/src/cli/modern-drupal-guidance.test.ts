import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { DETECTED_AGENT_ENV_VARS } from './agent/detect-agent.ts';

// Source-mode CLI. scripts/run-tests.ts sets MDG_DATA_DIR to the fixture build.
const scriptPath = path.resolve(import.meta.dirname, './modern-drupal-guidance.ts');

// Resolve tsx absolutely: several tests run the CLI from a temporary cwd.
const tsxLoader = import.meta.resolve('tsx');

const runCLI = (args: string[], opts: { env?: Record<string, string | undefined>; cwd?: string } = {}) =>
  spawnSync(process.execPath, ['--import', tsxLoader, scriptPath, ...args], {
    encoding: 'utf8',
    cwd: opts.cwd,
    env: { ...process.env, NO_COLOR: '1', ...opts.env },
  });

function shimDir(t: import('node:test').TestContext, bins: string[]): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mdg-shim-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  for (const bin of bins) {
    const log = path.join(dir, `${bin}-args.json`);
    fs.writeFileSync(
      path.join(dir, bin),
      `#!/bin/sh\nnode -e 'require("node:fs").writeFileSync(process.argv[1], JSON.stringify(process.argv.slice(2)))' "${log}" "$@"\n`,
      { mode: 0o755 }
    );
  }
  return dir;
}

describe('modern-drupal-guidance CLI', () => {
  it('prints usage', () => {
    const { stdout, status } = runCLI([]);
    assert.equal(status, 1);
    assert.ok(stdout.includes('Usage: modern-drupal-guidance <command> [args]'));
    for (const cmd of ['search <query>', 'retrieve <ids>', 'legacy-scan [path]', 'set-core <version>', 'target [--json]']) {
      assert.ok(stdout.includes(cmd), cmd);
    }
  });

  it('searches and lists in compact JSON', () => {
    const search = runCLI(['search', 'hook', 'attribute']);
    assert.equal(search.status, 0, search.stderr);
    assert.equal(JSON.parse(search.stdout)[0].id, 'fixture-oop-hooks');
    const list = JSON.parse(runCLI(['list']).stdout);
    assert.deepEqual(list.map((u: { id: string }) => u.id).sort(), ['fixture-cache-tags', 'fixture-oop-hooks', 'fixture-sdc-card']);
    assert.equal(runCLI(['search']).status, 1);
  });

  it('hints when a query is not English', () => {
    const res = runCLI(['search', 'フックを実装する']);
    assert.equal(res.status, 0);
    assert.deepEqual(JSON.parse(res.stdout), []);
    assert.ok(res.stderr.includes('Note: Search queries must be in English'));
    assert.ok(!runCLI(['search', 'cache tags']).stderr.includes('must be in English'));
  });

  it('retrieves several guides, splitting on commas, spaces and stray quotes, without duplicates', () => {
    const res = runCLI(['retrieve', '"fixture-oop-hooks,', 'fixture-cache-tags"', 'fixture-oop-hooks']);
    assert.equal(res.status, 0, res.stderr);
    assert.equal(res.stdout.split('--- Guide for fixture-oop-hooks ---').length - 1, 1);
    assert.ok(res.stdout.includes('--- Guide for fixture-cache-tags ---'));
    assert.ok(res.stdout.indexOf('fixture-oop-hooks ---') < res.stdout.indexOf('fixture-cache-tags ---'));
  });

  it('exits 1 but prints found guides when one ID is unknown', () => {
    const res = runCLI(['retrieve', 'fixture-sdc-card,nope']);
    assert.equal(res.status, 1);
    assert.ok(res.stdout.includes('--- Guide for fixture-sdc-card ---'));
    assert.match(res.stderr, /Retrieve failed for nope/);
  });

  it('records and reports the target core version', (t) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mdg-cli-core-'));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    fs.mkdirSync(path.join(dir, '.git'));
    assert.match(runCLI(['target'], { cwd: dir }).stdout, /No target Drupal core found/);
    assert.equal(runCLI(['set-core', '11.1'], { cwd: dir }).status, 0);
    assert.match(runCLI(['target'], { cwd: dir }).stdout, /Target Drupal core: 11\.1 \(from \.mdgrc/);
    assert.match(runCLI(['retrieve', 'fixture-oop-hooks'], { cwd: dir }).stdout, /use its main approach/);
  });

  it('forwards --help to legacy-scan and accepts --skill-version on either side', (t) => {
    assert.ok(runCLI(['--help', 'legacy-scan']).stdout.includes('Usage: modern-drupal-guidance legacy-scan'));
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mdg-scan-'));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    for (const args of [['--skill-version', '2026_01_01-test', 'legacy-scan', dir, '--json'], ['legacy-scan', dir, '--json', '--skill-version', '2026_01_01-test']]) {
      const res = runCLI(args);
      assert.equal(res.status, 0, res.stderr);
      const data = JSON.parse(res.stdout);
      assert.equal(data.totalFindings, 0);
      assert.equal(data.targetDir, dir);
    }
  });

  it('warns when the calling SKILL.md is out of date', () => {
    const versionPath = path.resolve(import.meta.dirname, 'skill-version.txt');
    const cleared = Object.fromEntries([...DETECTED_AGENT_ENV_VARS].map((k) => [k, undefined]));
    fs.writeFileSync(versionPath, '2026_11_12-latest12\n');
    try {
      const res = runCLI(['--skill-version', '2025_01_01-oldsha', 'list'], { env: cleared });
      assert.equal(res.status, 0);
      assert.ok(res.stderr.includes('Warning: a new SKILL.md is available for modern-drupal-guidance'));
      assert.ok(res.stderr.includes('PROBLEM DETECTED'));
      assert.ok(!runCLI(['--skill-version', '2026_11_12-latest12', 'list']).stderr.includes('Warning'));
    } finally {
      fs.rmSync(versionPath, { force: true });
    }
  });

  it('runs install, update and uninstall through the detected runner', (t) => {
    const cases = [
      { cmd: 'install', ua: 'pnpm/10.30.3 npm/? node/v24.12.0 linux x64', bin: 'pnpx',
        args: ['skills', 'add', 'example/source', '--skill', 'modern-drupal-guidance'] },
      { cmd: 'update', ua: 'yarn/4.5.0 npm/? node/v24.12.0 linux x64', bin: 'yarn', args: ['dlx', 'skills', 'update'] },
      { cmd: 'uninstall', ua: undefined, bin: 'npx', args: ['-y', 'skills', 'remove'] },
    ];
    for (const tc of cases) {
      const dir = shimDir(t, ['npx', 'pnpx', 'yarn']);
      const res = runCLI([tc.cmd], {
        cwd: dir,
        env: { PATH: `${dir}:${process.env.PATH}`, npm_config_user_agent: tc.ua, MDG_SKILL_SOURCE: 'example/source' },
      });
      assert.equal(res.status, 0, `${tc.cmd}: ${res.stderr}`);
      const recorded: string[] = JSON.parse(fs.readFileSync(path.join(dir, `${tc.bin}-args.json`), 'utf8'));
      assert.deepEqual(recorded.slice(0, tc.args.length), tc.args, tc.cmd);
    }
  });
});
