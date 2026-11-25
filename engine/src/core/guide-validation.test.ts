import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  validateGuide,
  validateAllGuides,
  validateDrupalCore,
  validateFrontmatterComments,
  scanAllGuides,
  inventoryGuide,
  parseDraft,
  isDisciplineGuide,
  getGuidesMap,
} from './guide-validation.ts';
import { fixtureGuidesDir } from './paths.ts';

function tree(t: import('node:test').TestContext, guides: Record<string, string>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mdg-guides-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const [rel, content] of Object.entries(guides)) {
    fs.mkdirSync(path.join(root, rel), { recursive: true });
    fs.writeFileSync(path.join(root, rel, 'guide.md'), content);
  }
  return root;
}

const GOOD = (name: string, extra = '') => `---
name: ${name}
description: A test guide.
drupal-core: ">=11.1"
${extra}---

# A sample

Body text.
`;

describe('fixture guides', () => {
  it('are all valid', () => {
    const { errors, checked } = validateAllGuides(fixtureGuidesDir);
    assert.deepEqual(errors, []);
    assert.equal(checked, 3);
  });

  it('are inventoried with drupal-core and publish state', () => {
    const guides = scanAllGuides(fixtureGuidesDir);
    assert.deepEqual(guides.map((g) => g.name), ['fixture-cache-tags', 'fixture-oop-hooks', 'fixture-sdc-card']);
    const hooks = guides.find((g) => g.name === 'fixture-oop-hooks')!;
    assert.equal(hooks.category, 'module-development');
    assert.equal(hooks.drupalCore, '>=11.1');
    assert.equal(hooks.isPublished, true);
    assert.equal(getGuidesMap().has('fixture-sdc-card'), true);
  });
});

describe('validateGuide', () => {
  it('requires name, description and drupal-core', (t) => {
    const root = tree(t, { 'module-development/x': '---\nname: y\n---\n\n# X\n\nBody.\n' });
    const { errors } = validateGuide(path.join(root, 'module-development/x/guide.md'));
    assert.ok(errors.some((e) => e.includes('does not match directory name "x"')));
    assert.ok(errors.some((e) => e.includes('Missing "description"')));
    assert.ok(errors.some((e) => e.includes('Missing "drupal-core"')));
  });

  it('accepts a valid guide and rejects a bad constraint', (t) => {
    const root = tree(t, {
      'testing/good': GOOD('good'),
      'testing/bad': GOOD('bad').replace('">=11.1"', '"eleven"'),
    });
    assert.deepEqual(validateGuide(path.join(root, 'testing/good/guide.md')).errors, []);
    assert.match(validateGuide(path.join(root, 'testing/bad/guide.md')).errors.join('\n'), /Invalid version "eleven"/);
  });

  it('only checks frontmatter on stubs and lets discipline guides omit description', (t) => {
    const root = tree(t, {
      'security/stub': '---\nname: stub\ndescription: Later.\ndrupal-core: ">=10.3"\ndraft: stub\n---\n',
      'security/security': '---\nname: security\ndrupal-core: ">=10.3"\n---\n\n# Security\n\nOrientation.\n',
    });
    assert.deepEqual(validateGuide(path.join(root, 'security/stub/guide.md')).errors, []);
    assert.deepEqual(validateGuide(path.join(root, 'security/security/guide.md')).errors, []);
    assert.equal(isDisciplineGuide('security', 'security'), true);
    const stub = inventoryGuide(path.join(root, 'security/stub'));
    assert.equal(stub.isStub, true);
    assert.equal(stub.isPublished, false);
  });

  it('flags an unquoted " #" that YAML would cut off', (t) => {
    const root = tree(t, {
      'module-development/hooks': GOOD('hooks').replace('description: A test guide.', 'description: Use the #[Hook] attribute.'),
    });
    const errors = validateGuide(path.join(root, 'module-development/hooks/guide.md')).errors;
    assert.ok(errors.some((e) => e.includes('unquoted " #"') && e.includes('"Use the"')), errors.join('\n'));
    assert.deepEqual(validateFrontmatterComments('---\ndescription: "Use the #[Hook] attribute."\n---\n', 'x'), []);
  });

  it('reports duplicate slugs across categories', (t) => {
    const root = tree(t, { 'testing/same': GOOD('same'), 'security/same': GOOD('same') });
    assert.ok(validateAllGuides(root).errors.some((e) => e.includes('Duplicate guide slug "same"')));
  });

  it('treats a missing guides directory as empty', () => {
    assert.deepEqual(scanAllGuides(path.join(os.tmpdir(), 'no-such-guides-dir')), []);
  });
});

describe('validateDrupalCore / parseDraft', () => {
  it('requires a quoted string', () => {
    assert.match(validateDrupalCore({ 'drupal-core': 11 as any }, 'x')[0], /quoted string/);
    assert.deepEqual(validateDrupalCore({ 'drupal-core': '^10.3 || ^11' }, 'x'), []);
  });

  it('accepts the draft states and requires a reason for blocked', () => {
    assert.deepEqual(parseDraft({ draft: 'wip' }, 'x'), { draft: 'wip', draftReason: undefined });
    assert.throws(() => parseDraft({ draft: 'blocked' }, 'x'), /draft-reason/);
    assert.throws(() => parseDraft({ draft: true }, 'x'), /must be one of/);
  });
});
