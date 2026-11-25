import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { runLegacyScanCli } from '../cli.ts';
import { DRUPAL_RULES } from '../rules/index.ts';

// Compiled to dist/test/; fixtures stay in the package root.
const packageRoot = fileURLToPath(new URL('../../', import.meta.url));

void test('legacy fixture triggers every rule; modern fixture triggers none', async (t) => {
  await t.test('legacy_example', async () => {
    const result = await runLegacyScanCli(['fixtures/legacy_example', '--json'], { cwd: packageRoot });
    assert.equal(result.exitCode, 0);
    const data = JSON.parse(result.output);
    const firedRules = new Set<string>(
      data.guides.flatMap((g: { rules: { ruleId: string }[] }) => g.rules.map((r) => r.ruleId)),
    );
    for (const rule of DRUPAL_RULES) {
      assert.ok(firedRules.has(rule.id), `rule ${rule.id} should fire on the legacy fixture`);
    }
    assert.equal(data.parseErrors, undefined);
  });

  await t.test('modern_example', async () => {
    const result = await runLegacyScanCli(['fixtures/modern_example', '--json'], { cwd: packageRoot });
    assert.equal(result.exitCode, 0);
    const data = JSON.parse(result.output);
    assert.equal(data.totalFindings, 0, JSON.stringify(data.guides, null, 2));
    assert.ok(data.scannedFileCount >= 7);
  });
});

void test('JSON output matches the upstream ScanJsonOutput shape', async () => {
  const result = await runLegacyScanCli(['fixtures/legacy_example', '--json'], { cwd: packageRoot });
  const data = JSON.parse(result.output);
  assert.deepEqual(
    Object.keys(data).sort(),
    ['activeGuideCount', 'activeRuleCount', 'guides', 'note', 'scannedFileCount', 'targetDir', 'totalFindings'].sort(),
  );
  let total = 0;
  for (const guide of data.guides) {
    assert.deepEqual(Object.keys(guide), ['guideId', 'retrieveCommand', 'count', 'rules']);
    assert.equal(guide.retrieveCommand, `npx modern-drupal-guidance retrieve ${guide.guideId}`);
    for (const rule of guide.rules) {
      assert.deepEqual(Object.keys(rule), ['ruleId', 'summary', 'verifierRubric', 'count', 'findings']);
      assert.ok(rule.verifierRubric.keepWhen.length > 0 && rule.verifierRubric.dropWhen.length > 0);
      for (const f of rule.findings) {
        assert.deepEqual(Object.keys(f), ['file', 'line', 'message', 'lineContent']);
        assert.ok(f.line > 0 && f.lineContent.length > 0);
      }
      total += rule.count;
    }
  }
  assert.equal(total, data.totalFindings);
});

void test('CLI options', async (t) => {
  await t.test('--guide filters to one guide', async () => {
    const result = await runLegacyScanCli(['fixtures/legacy_example', '--json', '--guide', 'oop-hooks'], { cwd: packageRoot });
    const data = JSON.parse(result.output);
    assert.deepEqual(data.guides.map((g: { guideId: string }) => g.guideId), ['oop-hooks']);
    assert.equal(data.activeGuideCount, 1);
  });

  await t.test('unknown guide and missing path are JSON errors', async () => {
    const bad = await runLegacyScanCli(['fixtures/legacy_example', '--json', '--guide', 'nope'], { cwd: packageRoot });
    assert.equal(bad.exitCode, 1);
    assert.match(JSON.parse(bad.output).error, /Unknown legacy-scan guide ID/);
    const missing = await runLegacyScanCli(['does/not/exist', '--json'], { cwd: packageRoot });
    assert.match(JSON.parse(missing.output).error, /Target path not found/);
  });

  await t.test('single-file targets work', async () => {
    const result = await runLegacyScanCli(['fixtures/legacy_example/legacy_example.module', '--json'], { cwd: packageRoot });
    const data = JSON.parse(result.output);
    assert.ok(data.totalFindings >= 4);
    assert.equal(data.scannedFileCount, 1);
  });

  await t.test('fixtures/ is skipped as test data when scanning the package root', async () => {
    const result = await runLegacyScanCli(['.', '--json'], { cwd: packageRoot });
    const data = JSON.parse(result.output);
    assert.equal(data.totalFindings, 0);
    assert.ok(data.skippedDocsAndTestsCount > 0);
  });
});
