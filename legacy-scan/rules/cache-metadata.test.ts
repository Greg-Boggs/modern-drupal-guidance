import assert from 'node:assert/strict';
import test from 'node:test';
import { scanSource } from '../scanners/index.ts';
import { renderArrayCacheMetadataRule } from './cache-metadata.ts';

const scan = (code: string, path = 'mymod/src/Plugin/Block/HelloBlock.php') => scanSource(path, code, [renderArrayCacheMetadataRule]);

const block = (build: string, extra = '') => `<?php
namespace Drupal\\mymod\\Plugin\\Block;
use Drupal\\Core\\Block\\BlockBase;
class HelloBlock extends BlockBase {
  public function build() {
${build}
  }
${extra}
}
`;

void test('cache-metadata: true positives', async (t) => {
  await t.test('flags a block that greets the current user without contexts', () => {
    const f = scan(block(`    $name = $this->currentUser->getDisplayName();
    return ['#markup' => $this->t('Hello @name', ['@name' => $name])];`));
    assert.equal(f.length, 1);
    assert.equal(f[0]?.line, 5);
    assert.equal(f[0]?.subPattern, 'block:user');
    assert.match(f[0]?.message ?? '', /'user'/);
  });

  await t.test('flags a block that lists loaded entities without tags (built via $build)', () => {
    const f = scan(block(`    $build = [];
    $nodes = $this->entityTypeManager->getStorage('node')->loadMultiple();
    foreach ($nodes as $node) {
      $build['items'][] = ['#markup' => $node->label()];
    }
    return $build;`));
    assert.equal(f[0]?.subPattern, 'block:entity');
  });

  await t.test('flags controllers that read config and time', () => {
    const f = scan(`<?php
namespace Drupal\\mymod\\Controller;
class StatusController extends ControllerBase {
  public function page() {
    $site = $this->config('system.site')->get('name');
    return ['#markup' => $site . ' ' . date('H:i')];
  }
}`, 'mymod/src/Controller/StatusController.php');
    assert.equal(f[0]?.subPattern, 'controller:config+time');
  });
});

void test('cache-metadata: look-alike negatives', async (t) => {
  await t.test('skips blocks that declare #cache', () => {
    assert.equal(scan(block(`    return [
      '#markup' => $this->currentUser->getDisplayName(),
      '#cache' => ['contexts' => ['user']],
    ];`)).length, 0);
  });

  await t.test('skips blocks that override getCacheContexts()', () => {
    assert.equal(scan(block(`    return ['#markup' => $this->currentUser->getDisplayName()];`, `  public function getCacheContexts() {
    return ['user'];
  }`)).length, 0);
  });

  await t.test('skips metadata applied with CacheableMetadata or addCacheableDependency', () => {
    assert.equal(scan(block(`    $build = ['#markup' => $this->config->get('x')];
    CacheableMetadata::createFromObject($this->config)->applyTo($build);
    return $build;`)).length, 0);
  });

  await t.test('skips static blocks and non-render returns', () => {
    assert.equal(scan(block(`    return ['#markup' => $this->t('Static text')];`)).length, 0);
    assert.equal(scan(`<?php
namespace Drupal\\mymod\\Controller;
class Api extends ControllerBase {
  public function json() { return new JsonResponse(['uid' => $this->currentUser()->id()]); }
}`, 'mymod/src/Controller/Api.php').length, 0);
  });

  await t.test('skips controller route parameters (dynamic page cache varies by route)', () => {
    assert.equal(scan(`<?php
namespace Drupal\\mymod\\Controller;
class C extends ControllerBase {
  public function page($id) {
    $p = $this->routeMatch->getParameter('id');
    return ['#markup' => $this->t('Item @id', ['@id' => $p])];
  }
}`, 'mymod/src/Controller/C.php').length, 0);
  });

  await t.test('skips lazy builders', () => {
    assert.equal(scan(block(`    return ['#lazy_builder' => ['mymod.lazy:build', [$this->currentUser->id()]], '#create_placeholder' => TRUE];`)).length, 0);
  });
});
