import assert from 'node:assert/strict';
import test from 'node:test';
import { scanSource } from '../scanners/index.ts';
import { markupUnsanitizedVariableRule } from './render-array-xss.ts';

const scan = (body: string) =>
  scanSource('mymod/mymod.module', `<?php
function mymod_render($node, $form_state) {
${body}
}
`, [markupUnsanitizedVariableRule]);

void test('render-array-xss: true positives', async (t) => {
  await t.test('flags concatenated parameters and interpolated strings', () => {
    const f = scan(`  $a = ['#markup' => '<h2>' . $node->label() . '</h2>'];
  $b = ['#markup' => "<p>Hello $name</p>"];
  $c = ['#markup' => $form_state->getValue('bio')];`);
    assert.deepEqual(f.map((x) => x.line), [3, 4, 5]);
    assert.match(f[0]?.message ?? '', /->label\(\)/);
    assert.match(f[1]?.message ?? '', /\$name/);
  });

  await t.test('flags assignment form and #prefix/#suffix', () => {
    const f = scan(`  $build['#markup'] = $_GET['q'];
  $build['#prefix'] = '<div class="' . $class . '">';`);
    assert.deepEqual(f.map((x) => x.subPattern), ['markup', 'prefix']);
  });

  await t.test('flags variables assigned from tainted values', () => {
    const f = scan(`  $title = $node->title->value;
  $out = '<b>' . $title . '</b>';
  return ['#markup' => $out];`);
    assert.equal(f.length, 1);
    assert.match(f[0]?.message ?? '', /\$out, which holds \$title/);
  });

  await t.test('flags t() built by concatenation and Markup::create() of input', () => {
    const f = scan(`  $a = ['#markup' => t('Hello ' . $name)];
  $b = ['#markup' => Markup::create($node->body->value)];`);
    assert.equal(f.length, 2);
    assert.match(f[0]?.message ?? '', /@placeholder/);
    assert.match(f[1]?.message ?? '', /Markup::create/);
  });
});

void test('render-array-xss: look-alike negatives', async (t) => {
  await t.test('skips literals, t() placeholders and TranslatableMarkup', () => {
    assert.equal(scan(`  $a = ['#markup' => '<p>Static</p>'];
  $b = ['#markup' => t('Hello @name', ['@name' => $name])];
  $c = ['#markup' => $this->t('Hi %u', ['%u' => $node->label()])];
  $d = ['#markup' => new TranslatableMarkup('Count: @c', ['@c' => $count])];`).length, 0);
  });

  await t.test('skips escaped, rendered and integer values', () => {
    assert.equal(scan(`  $a = ['#markup' => Html::escape($node->label())];
  $b = ['#markup' => $renderer->render($elements)];
  $c = ['#markup' => '<span>' . (int) $count . '</span>'];
  $d = ['#markup' => Xss::filter($input)];
  $e = ['#markup' => count($items)];`).length, 0);
  });

  await t.test('skips variables only assigned safe values', () => {
    assert.equal(scan(`  $label = t('Saved');
  $html = '<em>' . $label . '</em>';
  return ['#markup' => $html];`).length, 0);
  });

  await t.test('skips bare variables of unknown origin (no markup built around them)', () => {
    assert.equal(scan(`  foreach ($items as $item) {
    $rows[] = ['#markup' => $item];
  }
  $x = ['#markup' => $node];`).length, 0);
  });

  await t.test('skips extending an existing #prefix/#suffix and render-array properties', () => {
    assert.equal(scan(`  $element['#prefix'] = ($element['#prefix'] ?? '') . '<div class="wrap">';
  $form['#prefix'] = '<div id="' . $form['#wrapper_id'] . '">';`).length, 0);
  });

  await t.test('skips #plain_text and other keys', () => {
    assert.equal(scan(`  $a = ['#plain_text' => $node->label()];
  $b = ['#title' => $node->label(), '#type' => 'item'];
  $c = ['markup' => $name];`).length, 0);
  });
});
