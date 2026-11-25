import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { moduleEnabled, noDeprecatedApis, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_catalog';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('get-items', 'bench_catalog.catalog->getItems() returns [alpha, beta, gamma] and stores it under bench_catalog:items in the default bin.', M, String.raw`\Drupal::cache()->delete('bench_catalog:items');
$items = \Drupal::service('bench_catalog.catalog')->getItems();
print json_encode(['pass' => $items === ['alpha', 'beta', 'gamma'] && (\Drupal::cache()->get('bench_catalog:items')->data ?? NULL) === $items, 'detail' => $items]);`),
    phpCheck('prewarmable', 'The service implements \\Drupal\\Core\\PreWarm\\PreWarmableInterface.', M, String.raw`print json_encode(\Drupal::service('bench_catalog.catalog') instanceof \Drupal\Core\PreWarm\PreWarmableInterface);`),
    phpCheck('prewarmer-fills-cache', 'With the cache item deleted, core\'s cache_prewarmer->preWarmAllCaches() fills bench_catalog:items.', M, String.raw`\Drupal::cache()->delete('bench_catalog:items');
\Drupal::service('cache_prewarmer')->preWarmAllCaches();
$c = \Drupal::cache()->get('bench_catalog:items');
print json_encode(['pass' => ($c->data ?? NULL) === ['alpha', 'beta', 'gamma'], 'detail' => $c->data ?? NULL]);`),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['prewarmable', 'no-deprecated-api']);
