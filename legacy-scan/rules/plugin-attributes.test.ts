import assert from 'node:assert/strict';
import test from 'node:test';
import { scanSource } from '../scanners/index.ts';
import { pluginAnnotationRule } from './plugin-attributes.ts';

const scan = (code: string, path = 'mymod/src/Plugin/Block/HelloBlock.php') => scanSource(path, code, [pluginAnnotationRule]);

void test('plugin-attributes: true positives', async (t) => {
  await t.test('flags @Block annotation on the annotation line', () => {
    const f = scan(`<?php
namespace Drupal\\mymod\\Plugin\\Block;

use Drupal\\Core\\Block\\BlockBase;

/**
 * Provides a hello block.
 *
 * @Block(
 *   id = "mymod_hello",
 *   admin_label = @Translation("Hello"),
 * )
 */
class HelloBlock extends BlockBase {}
`);
    assert.equal(f.length, 1);
    assert.equal(f[0]?.line, 9);
    assert.equal(f[0]?.subPattern, 'Block');
  });

  await t.test('maps renamed attributes (MigrateProcessPlugin -> MigrateProcess, SearchPlugin -> Search)', () => {
    const f = scan(`<?php
/**
 * @MigrateProcessPlugin(id = "mymod_trim")
 */
class Trim extends ProcessPluginBase {}
`);
    assert.match(f[0]?.message ?? '', /#\[MigrateProcess\(/);
  });

  await t.test('flags entity type annotations', () => {
    const f = scan(`<?php
/**
 * @ContentEntityType(
 *   id = "mymod_thing",
 *   label = @Translation("Thing"),
 * )
 */
class Thing extends ContentEntityBase {}
`, 'mymod/src/Entity/Thing.php');
    assert.equal(f.length, 1);
  });
});

void test('plugin-attributes: look-alike negatives', async (t) => {
  await t.test('skips classes that already have the attribute', () => {
    assert.equal(scan(`<?php
use Drupal\\Core\\Block\\Attribute\\Block;
/**
 * @Block(id = "mymod_hello", admin_label = @Translation("Hello"))
 */
#[Block(id: "mymod_hello", admin_label: new TranslatableMarkup("Hello"))]
class HelloBlock extends BlockBase {}
`).length, 0);
  });

  await t.test('skips contrib plugin annotations and nested @Translation', () => {
    assert.equal(scan(`<?php
/**
 * @WebformHandler(
 *   id = "mymod",
 *   label = @Translation("Mine"),
 * )
 */
class MyHandler extends WebformHandlerBase {}
`).length, 0);
  });

  await t.test('skips @see/@param tags and prose mentioning @Block', () => {
    assert.equal(scan(`<?php
/**
 * Unlike the old @Block annotation, this uses attributes.
 *
 * @see \\Drupal\\Core\\Block\\Attribute\\Block
 */
#[Block(id: "x")]
class HelloBlock extends BlockBase {}
`).length, 0);
  });

  await t.test('skips annotations on methods (Drush commands, PHPUnit)', () => {
    assert.equal(scan(`<?php
class Commands {
  /**
   * @Block(id = "nope")
   */
  public function foo() {}
}
`).length, 0);
  });
});
