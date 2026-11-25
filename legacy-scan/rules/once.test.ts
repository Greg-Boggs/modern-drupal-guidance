import assert from 'node:assert/strict';
import test from 'node:test';
import { scanSource } from '../scanners/index.ts';
import {
  jqueryOnceJsRule,
  jqueryOnceLibraryPhpRule,
  jqueryOnceLibraryTwigRule,
  jqueryOnceLibraryYamlRule,
} from './once.ts';

void test('once (JS): true positives', async (t) => {
  await t.test('flags $(...).once() inside a behavior', () => {
    const f = scanSource('mymod/js/mymod.js', `(function ($, Drupal) {
  Drupal.behaviors.mymod = {
    attach(context) {
      $('.mymod', context).once('mymod').each(function () {});
      $(context).find('.x').once('x').addClass('y');
      $('.z').removeOnce('z');
      $('.z').findOnce('z');
      jQuery.once('legacy');
    },
  };
})(jQuery, Drupal);
`, [jqueryOnceJsRule]);
    assert.deepEqual(f.map((x) => x.line), [4, 5, 6, 7, 8]);
    assert.deepEqual(f.map((x) => x.subPattern), ['jquery-once', 'jquery-once', 'jquery-removeOnce', 'jquery-findOnce', 'jquery-once']);
  });

  await t.test('flags .once(id) on an unknown receiver (stored jQuery collection)', () => {
    const f = scanSource('a.js', `const $items = getItems(); $items.once('mymod');`, [jqueryOnceJsRule]);
    assert.equal(f.length, 1);
  });
});

void test('once (JS): look-alike negatives', async (t) => {
  await t.test('skips core/once calls', () => {
    assert.equal(scanSource('a.js', `once('mymod', '.mymod', context).forEach((el) => {});
once.remove('mymod', '.mymod');
once.find('mymod');`, [jqueryOnceJsRule]).length, 0);
  });

  await t.test('skips EventEmitter-style .once(event, handler)', () => {
    assert.equal(scanSource('a.js', `emitter.once('ready', () => {});
socket.once('close', onClose);
process.once('exit', handler);`, [jqueryOnceJsRule]).length, 0);
  });

  await t.test('skips minified files', () => {
    assert.equal(scanSource('a.min.js', `$('.x').once('x');`, [jqueryOnceJsRule]).length, 0);
  });
});

void test('once (YAML/Twig/PHP library references)', async (t) => {
  await t.test('flags core/jquery.once in libraries.yml dependencies', () => {
    const f = scanSource('mymod/mymod.libraries.yml', `mymod:
  js:
    js/mymod.js: {}
  dependencies:
    - core/drupal
    - core/jquery.once
`, [jqueryOnceLibraryYamlRule]);
    assert.equal(f.length, 1);
    assert.equal(f[0]?.line, 6);
  });

  await t.test('skips core/once and look-alike library names', () => {
    assert.equal(scanSource('mymod/mymod.libraries.yml', `mymod:
  dependencies:
    - core/once
    - mymod/jquery.once.helpers
`, [jqueryOnceLibraryYamlRule]).length, 0);
    // Not a libraries or info file.
    assert.equal(scanSource('mymod/config/install/x.yml', `deps: [core/jquery.once]\n`, [jqueryOnceLibraryYamlRule]).length, 0);
  });

  await t.test('flags attach_library in Twig but not in comments or plain text', () => {
    const f = scanSource('mytheme/templates/node.html.twig', `{{ attach_library('core/jquery.once') }}
{# {{ attach_library('core/jquery.once') }} #}
<p>attach_library('core/jquery.once')</p>
{{ attach_library('core/once') }}
`, [jqueryOnceLibraryTwigRule]);
    assert.deepEqual(f.map((x) => x.line), [1]);
  });

  await t.test('flags #attached core/jquery.once in PHP, not in comments', () => {
    const f = scanSource('mymod/mymod.module', `<?php
// Used to depend on core/jquery.once.
$build['#attached']['library'][] = 'core/jquery.once';
$build['#attached']['library'][] = 'core/once';
`, [jqueryOnceLibraryPhpRule]);
    assert.deepEqual(f.map((x) => x.line), [3]);
  });
});
