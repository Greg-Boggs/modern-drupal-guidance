import assert from 'node:assert/strict';
import test from 'node:test';
import { scanSource } from '../scanners/index.ts';
import { allowsMajor } from './constraint.ts';
import { coreVersionRequirementRule } from './core-version-requirement.ts';

const scan = (yaml: string, path = 'mymod/mymod.info.yml') => scanSource(path, yaml, [coreVersionRequirementRule]);

void test('constraint evaluator', () => {
  const cases: [string, number, boolean][] = [
    ['^8 || ^9', 11, false],
    ['^9 || ^10', 11, false],
    ['^10.3 || ^11', 11, true],
    ['^11', 11, true],
    ['>=10', 11, true],
    ['~10.2', 11, false],
    ['~11.0', 11, true],
    ['8.x', 11, false],
    ['>=9.5 <11', 11, false],
    ['>=10 <12', 11, true],
    ['^9.5 | ^10', 11, false],
    ['9.5 - 10.2', 11, false],
    ['<=10.4', 11, false],
    ['>10', 11, true],
    ['^10 || ^11', 10, true],
  ];
  for (const [constraint, major, expected] of cases) {
    assert.equal(allowsMajor(constraint, major), expected, `${constraint} allows ${major}`);
  }
  assert.equal(allowsMajor('banana', 11), null);
});

void test('core-version-requirement: true positives', async (t) => {
  await t.test('flags a missing key, pointing at the legacy core: key', () => {
    const f = scan(`name: My module
type: module
core: 8.x
package: Custom
`);
    assert.equal(f.length, 1);
    assert.equal(f[0]?.line, 3);
    assert.equal(f[0]?.subPattern, 'core-key-only');
  });

  await t.test('flags a missing key with no core key at all', () => {
    const f = scan(`name: My theme
type: theme
base theme: false
`, 'mytheme/mytheme.info.yml');
    assert.equal(f[0]?.subPattern, 'missing');
    assert.equal(f[0]?.line, 2);
  });

  await t.test('flags a constraint that excludes the current major', () => {
    const f = scan(`name: My module
type: module
core_version_requirement: ^8.8 || ^9 || ^10
`);
    assert.equal(f.length, 1);
    assert.equal(f[0]?.line, 3);
    assert.equal(f[0]?.subPattern, 'outdated');
  });

  await t.test('flags constraints it cannot parse', () => {
    assert.equal(scan(`name: X
type: module
core_version_requirement: "eleven please"
`)[0]?.subPattern, 'unparseable');
  });
});

void test('core-version-requirement: look-alike negatives', async (t) => {
  await t.test('accepts constraints that allow the current major', () => {
    for (const c of ['^10.3 || ^11', '^11', '>=10.3', '^11.1']) {
      assert.equal(scan(`name: X\ntype: module\ncore_version_requirement: '${c}'\n`).length, 0, c);
    }
  });

  await t.test('skips core extensions, testing modules and non-extension info files', () => {
    assert.equal(scan(`name: Node\ntype: module\npackage: Core\nversion: VERSION\n`).length, 0);
    assert.equal(scan(`name: Test helper\ntype: module\npackage: Testing\n`).length, 0);
    assert.equal(scan(`name: Engine\ntype: theme_engine\n`).length, 0);
  });

  await t.test('only reads *.info.yml files', () => {
    assert.equal(scan(`type: module\n`, 'mymod/mymod.libraries.yml').length, 0);
    assert.equal(scan(`type: module\n`, 'mymod/config/install/mymod.settings.yml').length, 0);
  });
});
