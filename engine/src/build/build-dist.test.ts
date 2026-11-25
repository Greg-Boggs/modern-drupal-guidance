import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import * as esbuild from 'esbuild';
import { createStripTsMorphLibFilesPlugin, computeSkillVersion, updateVersionsInDir } from './build-dist.ts';
import { replaceMacros } from '../core/macros.ts';
import { rootDir } from '../core/paths.ts';

describe('build-dist helpers', () => {
  it('SKILL.md uses the same retrieve command GUIDE_REF renders', () => {
    const skill = fs.readFileSync(path.join(rootDir, 'skill/SKILL.md'), 'utf8');
    assert.ok(skill.includes('npx -y modern-drupal-guidance@latest retrieve "<id>"'));
    const ref = replaceMacros('{{ GUIDE_REF("fixture-oop-hooks") }}', 'test.md');
    assert.ok(ref.includes('npx -y modern-drupal-guidance@latest retrieve "fixture-oop-hooks"'));
  });

  it('computes a skill version without git history', (t) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mdg-skill-'));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    fs.writeFileSync(path.join(dir, 'SKILL.md'), '---\nname: x\n---\n');
    assert.match(computeSkillVersion(path.join(dir, 'SKILL.md')), /^\d{4}_\d{2}_\d{2}-[0-9a-f]{8}$/);
  });

  it('stamps the version into every manifest', (t) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mdg-ver-'));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    fs.cpSync(path.join(rootDir, 'src/cli/template'), dir, { recursive: true });
    updateVersionsInDir(dir, '1.2.3');
    assert.equal(JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).version, '1.2.3');
    assert.equal(JSON.parse(fs.readFileSync(path.join(dir, '.claude-plugin/marketplace.json'), 'utf8')).plugins[0].version, '1.2.3');
    assert.equal(JSON.parse(fs.readFileSync(path.join(dir, '.codex-plugin/plugin.json'), 'utf8')).version, '1.2.3');
  });

  it('strip-ts-morph-lib-files plugin fails fast when ts-morph-common.js is missing from bundle', async () => {
    await assert.rejects(
      esbuild.build({
        stdin: { contents: 'export const x = 1;', resolveDir: rootDir },
        bundle: true,
        write: false,
        plugins: [createStripTsMorphLibFilesPlugin()],
      }),
      /did not match any file/
    );
  });
});
