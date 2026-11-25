import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { replaceMacros, validateMacros, formatDrupalStatus, parseArguments, stripComments, MACRO_NAMES } from './macros.ts';
import { guidesDir } from './paths.ts';

const guideFile = path.join(guidesDir, 'caching-and-performance/fixture-cache-tags/guide.md');

describe('DRUPAL_STATUS', () => {
  it('renders the guide range from options.drupalCore', () => {
    const out = replaceMacros('{{ DRUPAL_STATUS() }}', guideFile, { drupalCore: '>=11.1' });
    assert.equal(out, '**Drupal core:** 11.1 and later (`>=11.1`).');
  });

  it('renders an explicit constraint argument', () => {
    const out = replaceMacros('{{ DRUPAL_STATUS("^10.3 || ^11") }}', guideFile, { drupalCore: '>=11.1' });
    assert.equal(out, '**Drupal core:** 10.3 to 11.x (`^10.3 || ^11`).');
  });

  it('reports a missing or bad constraint', () => {
    assert.match(validateMacros('{{ DRUPAL_STATUS() }}', 'x.md')[0], /needs a constraint/);
    assert.match(validateMacros('{{ DRUPAL_STATUS("eleven") }}', 'x.md')[0], /Invalid version/);
  });

  it('appends supported releases when the dataset is present', () => {
    // scripts/run-tests.ts points MDG_DRUPAL_DATA_DIR at a missing directory, so no suffix here.
    assert.equal(formatDrupalStatus('>=11.1'), '**Drupal core:** 11.1 and later (`>=11.1`).');
  });
});

describe('GUIDE_REF', () => {
  it('renders a retrieve command for a known guide', () => {
    const out = replaceMacros('{{ GUIDE_REF("fixture-oop-hooks") }}', guideFile);
    assert.equal(out, '`fixture-oop-hooks` (via `npx -y modern-drupal-guidance@latest retrieve "fixture-oop-hooks"`)');
  });

  it('fails for an unknown guide', () => {
    assert.match(validateMacros('{{ GUIDE_REF("nope") }}', 'x.md')[0], /Guide "nope" not found/);
  });
});

describe('INCLUDE', () => {
  it('transcludes a sibling file and a section', (t) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mdg-include-'));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    fs.writeFileSync(path.join(dir, 'snippet.md'), '## Fallback\n\nUse LegacyHook.\n\n## Other\n\nNo.\n');
    const host = path.join(dir, 'guide.md');
    assert.match(replaceMacros('{{ INCLUDE("./snippet.md#fallback") }}', host), /Use LegacyHook\./);
    assert.doesNotMatch(replaceMacros('{{ INCLUDE("./snippet.md#fallback") }}', host), /No\./);
    assert.match(validateMacros('{{ INCLUDE("/etc/passwd") }}', host)[0], /Absolute paths/);
  });
});

describe('macro parsing', () => {
  it('only knows the Drupal macro set', () => {
    assert.deepEqual([...MACRO_NAMES].sort(), ['DRUPAL_STATUS', 'GUIDE_REF', 'INCLUDE']);
    // Removed web macros are left untouched rather than expanded.
    assert.equal(replaceMacros('{{ BASELINE_STATUS("dialog") }}', guideFile), '{{ BASELINE_STATUS("dialog") }}');
  });

  it('parses quoted arguments with commas and pipes', () => {
    assert.deepEqual(parseArguments('"^10.3 || ^11", \'b\''), ['^10.3 || ^11', 'b']);
  });

  it('strips {# #} comments but keeps Twig comments inside code', () => {
    const md = 'Text {# note #} here.\n\n```twig\n{# card.twig #}\n```\n';
    const out = stripComments(md);
    assert.ok(out.includes('Text here.'));
    assert.ok(out.includes('{# card.twig #}'));
  });
});
