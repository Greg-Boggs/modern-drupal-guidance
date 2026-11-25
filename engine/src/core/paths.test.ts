import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {
  rootDir,
  guidesDir,
  defaultGuidesDir,
  projectRoot,
  fixtureGuidesDir,
  baseAppsDir,
  outDir,
  resultsDir,
  suitesDir,
  dashboardDir,
  getGuideResultsDir,
  resolveGuideResultsDir,
} from './paths.ts';

describe('paths.ts exports', () => {
  test('guidesDir honours MDG_GUIDES_DIR (set to the fixtures by scripts/run-tests.ts)', () => {
    const expected = process.env.MDG_GUIDES_DIR ? path.resolve(process.env.MDG_GUIDES_DIR) : defaultGuidesDir;
    assert.equal(guidesDir, expected);
  });

  test('exports correct absolute paths relative to rootDir', () => {
    assert.equal(projectRoot, path.resolve(rootDir, '..'));
    assert.equal(defaultGuidesDir, path.join(rootDir, '..', 'guides'));
    assert.equal(fixtureGuidesDir, path.join(rootDir, 'test-fixtures', 'guides'));
    assert.equal(baseAppsDir, path.join(rootDir, 'src/harness/base-apps'));
    assert.equal(outDir, path.join(rootDir, 'out'));
    assert.equal(resultsDir, path.join(rootDir, 'results'));
    assert.equal(suitesDir, path.join(rootDir, 'results/suites'));
    assert.equal(dashboardDir, path.join(rootDir, 'src/dashboard'));
  });

  test('getGuideResultsDir constructs path correctly with name', () => {
    assert.equal(
      getGuideResultsDir({ category: 'css', name: 'scrollspy' }),
      path.join(resultsDir, 'guides', 'css', 'scrollspy')
    );
    assert.throws(
      () => getGuideResultsDir({ category: 'forms' } as any),
      /missing name/
    );
  });

  test('resolveGuideResultsDir resolves from guideInfo or targetDir', () => {
    assert.equal(
      resolveGuideResultsDir('/tmp/some-dir', { category: 'css', name: 'scrollspy' }),
      path.join(resultsDir, 'guides', 'css', 'scrollspy')
    );
    assert.equal(
      resolveGuideResultsDir(path.join(guidesDir, 'forms', 'input-address')),
      path.join(resultsDir, 'guides', 'forms', 'input-address')
    );
  });
});
