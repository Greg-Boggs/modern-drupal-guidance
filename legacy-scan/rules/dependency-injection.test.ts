import assert from 'node:assert/strict';
import test from 'node:test';
import { scanSource } from '../scanners/index.ts';
import { drupalStaticInInjectableClassRule } from './dependency-injection.ts';

const scan = (path: string, code: string) => scanSource(path, code, [drupalStaticInInjectableClassRule]);

void test('dependency-injection: true positives', async (t) => {
  await t.test('flags \\Drupal:: in a controller', () => {
    const f = scan('mymod/src/Controller/HelloController.php', `<?php
namespace Drupal\\mymod\\Controller;
use Drupal\\Core\\Controller\\ControllerBase;
class HelloController extends ControllerBase {
  public function page() {
    $nodes = \\Drupal::entityTypeManager()->getStorage('node')->loadMultiple();
    return ['#markup' => 'x'];
  }
}
`);
    assert.equal(f.length, 1);
    assert.equal(f[0]?.line, 6);
    assert.equal(f[0]?.subPattern, 'controller');
  });

  await t.test('flags forms, plugins, hook classes, subscribers and services', () => {
    const files: [string, string, string][] = [
      ['mymod/src/Form/SettingsForm.php', 'form', `<?php
namespace Drupal\\mymod\\Form;
class SettingsForm extends ConfigFormBase {
  public function buildForm(array $form, $form_state) { \\Drupal::messenger()->addStatus('x'); return $form; }
}`],
      ['mymod/src/Plugin/Block/B.php', 'plugin', `<?php
namespace Drupal\\mymod\\Plugin\\Block;
class B extends BlockBase {
  public function build() { return ['#markup' => \\Drupal::currentUser()->id()]; }
}`],
      ['mymod/src/Hook/MymodHooks.php', 'hook-class', `<?php
namespace Drupal\\mymod\\Hook;
class MymodHooks {
  #[Hook('cron')]
  public function cron() { \\Drupal::state()->set('x', 1); }
}`],
      ['mymod/src/EventSubscriber/S.php', 'event-subscriber', `<?php
namespace Drupal\\mymod\\EventSubscriber;
class S implements EventSubscriberInterface {
  public static function getSubscribedEvents() { return []; }
  public function onRequest($event) { \\Drupal::logger('mymod')->info('x'); }
}`],
      ['mymod/src/Mailer.php', 'service', `<?php
namespace Drupal\\mymod;
class Mailer {
  public function __construct(protected $config) {}
  public function send() { return \\Drupal::service('plugin.manager.mail'); }
}`],
    ];
    for (const [path, kind, code] of files) {
      const f = scan(path, code);
      assert.equal(f.length, 1, path);
      assert.equal(f[0]?.subPattern, kind, path);
    }
  });

  await t.test('flags Drupal:: imported with use Drupal;', () => {
    const f = scan('mymod/src/Controller/C.php', `<?php
namespace Drupal\\mymod\\Controller;
use Drupal;
class C extends ControllerBase {
  public function page() { return ['#markup' => Drupal::config('system.site')->get('name')]; }
}`);
    assert.equal(f.length, 1);
  });
});

void test('dependency-injection: look-alike negatives', async (t) => {
  await t.test('skips entity classes, field items and tests', () => {
    assert.equal(scan('mymod/src/Entity/Thing.php', `<?php
namespace Drupal\\mymod\\Entity;
class Thing extends ContentEntityBase {
  public function getOwner() { return \\Drupal::entityTypeManager()->getStorage('user')->load(1); }
}`).length, 0);
    assert.equal(scan('mymod/src/Plugin/Field/FieldType/Item.php', `<?php
namespace Drupal\\mymod\\Plugin\\Field\\FieldType;
class Item extends FieldItemBase {
  public function preSave() { \\Drupal::time()->getRequestTime(); }
}`).length, 0);
    assert.equal(scan('mymod/tests/src/Kernel/T.php', `<?php
namespace Drupal\\Tests\\mymod\\Kernel;
class T extends KernelTestBase {
  public function testX() { \\Drupal::service('foo'); }
}`).length, 0);
  });

  await t.test('skips static methods (create(), static callbacks)', () => {
    assert.equal(scan('mymod/src/Plugin/Block/B.php', `<?php
namespace Drupal\\mymod\\Plugin\\Block;
class B extends BlockBase implements TrustedCallbackInterface {
  public static function preRender($element) { $element['#x'] = \\Drupal::service('renderer'); return $element; }
}`).length, 0);
  });

  await t.test('skips BC fallbacks for optional constructor arguments', () => {
    assert.equal(scan('mymod/src/Controller/C.php', `<?php
namespace Drupal\\mymod\\Controller;
class C extends ControllerBase {
  public function __construct(protected ?TimeInterface $time = NULL) {
    if ($time === NULL) {
      @trigger_error('Calling without $time is deprecated', E_USER_DEPRECATED);
      $this->time = \\Drupal::service('datetime.time');
    }
  }
  public function other() { return $this->time ?? \\Drupal::time(); }
}`).length, 0);
  });

  await t.test('skips __wakeup and container presence checks', () => {
    assert.equal(scan('mymod/src/Form/F.php', `<?php
namespace Drupal\\mymod\\Form;
class F extends FormBase {
  public function __wakeup() { $c = \\Drupal::getContainer(); }
  public function buildForm(array $form, $form_state) { if (\\Drupal::hasService('x')) {} return $form; }
}`).length, 0);
  });

  await t.test('skips plain value classes and procedural code', () => {
    assert.equal(scan('mymod/src/Value.php', `<?php
namespace Drupal\\mymod;
final class Value {
  public function label() { return \\Drupal::translation()->translate('x'); }
}`).length, 0);
    assert.equal(scan('mymod/mymod.module', `<?php
function mymod_cron() { \\Drupal::state()->set('x', 1); }
`).length, 0);
  });

  await t.test('leaves removed \\Drupal::l() to the removed-apis rule', () => {
    assert.equal(scan('mymod/src/Controller/C.php', `<?php
namespace Drupal\\mymod\\Controller;
class C extends ControllerBase {
  public function page() { return ['#markup' => \\Drupal::l('x', $url)]; }
}`).length, 0);
  });
});
