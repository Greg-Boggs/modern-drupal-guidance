import assert from 'node:assert/strict';
import test from 'node:test';
import { scanSource } from '../scanners/index.ts';
import { proceduralHookRule } from './oop-hooks.ts';

const scan = (path: string, code: string) => scanSource(path, code, [proceduralHookRule]);

void test('oop-hooks: true positives', async (t) => {
  await t.test('flags a documented hook in a .module file', () => {
    const f = scan('mymod/mymod.module', `<?php
/**
 * Implements hook_help().
 */
function mymod_help($route_name, $route_match) {
  return '';
}
`);
    assert.equal(f.length, 1);
    assert.equal(f[0]?.line, 5);
    assert.equal(f[0]?.subPattern, 'module-hook');
    assert.match(f[0]?.message ?? '', /#\[Hook\('help'\)\]/);
  });

  await t.test('flags a known hook name without a docblock', () => {
    const f = scan('mymod/mymod.module', `<?php
function mymod_form_user_login_form_alter(&$form, $form_state, $form_id) {}
function mymod_node_presave($node) {}
`);
    assert.deepEqual(f.map((x) => x.line), [2, 3]);
  });

  await t.test('flags hooks in *.inc files and preprocess hooks', () => {
    const f = scan('mymod/mymod.views.inc', `<?php
/**
 * Implements hook_views_data_alter().
 */
function mymod_views_data_alter(array &$data) {}
`);
    assert.equal(f.length, 1);
    const p = scan('mymod/mymod.module', `<?php
function mymod_preprocess_node(&$variables) {}
`);
    assert.equal(p[0]?.subPattern, 'preprocess');
  });

  await t.test('flags hooks in a .theme file as theme hooks', () => {
    const f = scan('mytheme/mytheme.theme', `<?php
function mytheme_preprocess_page(&$variables) {}
function mytheme_theme_suggestions_page_alter(array &$suggestions, array $variables) {}
`);
    assert.equal(f.length, 2);
    assert.equal(f[0]?.subPattern, 'preprocess');
    assert.equal(f[1]?.subPattern, 'theme-hook');
  });
});

void test('oop-hooks: deprecated procedural-only hooks', async (t) => {
  await t.test('flags hook_requirements() in .install without #[LegacyRequirementsHook]', () => {
    const f = scan('mymod/mymod.install', `<?php
/**
 * Implements hook_requirements().
 */
function mymod_requirements($phase) {
  return [];
}
`);
    assert.equal(f.length, 1);
    assert.equal(f[0]?.subPattern, 'requirements');
    assert.match(f[0]?.message ?? '', /runtime_requirements/);
  });

  await t.test('flags hook_module_implements_alter() without #[LegacyModuleImplementsAlter]', () => {
    const f = scan('mymod/mymod.module', `<?php
function mymod_module_implements_alter(&$implementations, $hook) {}
`);
    assert.equal(f[0]?.subPattern, 'module-implements-alter');
    assert.match(f[0]?.message ?? '', /ReorderHook/);
  });
});

void test('oop-hooks: look-alike negatives', async (t) => {
  await t.test('skips procedural-only install-time hooks', () => {
    const f = scan('mymod/mymod.module', `<?php
/** Implements hook_hook_info(). */
function mymod_hook_info() {}
function mymod_update_10001() {}
function mymod_post_update_fix_things() {}
/** Implements hook_schema(). */
function mymod_schema() {}
`);
    assert.equal(f.length, 0);
  });

  await t.test('skips hook_requirements / hook_module_implements_alter that carry their Legacy attribute', () => {
    assert.equal(scan('mymod/mymod.install', `<?php
#[LegacyRequirementsHook]
function mymod_requirements($phase) {}
`).length, 0);
    assert.equal(scan('mymod/mymod.module', `<?php
#[LegacyModuleImplementsAlter]
function mymod_module_implements_alter(&$implementations, $hook) {}
`).length, 0);
  });

  await t.test('skips .install files entirely', () => {
    assert.equal(scan('mymod/mymod.install', `<?php
/** Implements hook_install(). */
function mymod_install() {}
/** Implements hook_cron(). */
function mymod_cron() {}
`).length, 0);
  });

  await t.test('skips #[LegacyHook] BC shims', () => {
    assert.equal(scan('mymod/mymod.module', `<?php
use Drupal\\Core\\Hook\\Attribute\\LegacyHook;
/** Implements hook_help(). */
#[LegacyHook]
function mymod_help($route_name, $route_match) {
  return \\Drupal::service(MymodHooks::class)->help($route_name, $route_match);
}
`).length, 0);
  });

  await t.test('skips helpers and callbacks that share the module prefix', () => {
    assert.equal(scan('mymod/mymod.module', `<?php
function mymod_batch_finished($success, $results, $operations) {}
function mymod_settings_form_submit(&$form, $form_state) {}
function mymod_load_items() {}
/** Form #validate callback. */
function mymod_user_validate($form, $form_state) {}
`).length, 0);
  });

  await t.test('skips functions from another module prefix and template_preprocess', () => {
    assert.equal(scan('mymod/mymod.module', `<?php
function othermod_help() {}
function template_preprocess_mymod_widget(&$variables) {}
`).length, 0);
  });

  await t.test('skips class files and OOP hook methods', () => {
    assert.equal(scan('mymod/src/Hook/MymodHooks.php', `<?php
namespace Drupal\\mymod\\Hook;
use Drupal\\Core\\Hook\\Attribute\\Hook;
class MymodHooks {
  #[Hook('help')]
  public function help($route_name, $route_match) {}
}
`).length, 0);
  });
});
