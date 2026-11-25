import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { moduleEnabled, noDeprecatedApis, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_where';
const P = String.raw`$p = \Drupal::service('plugin.manager.block')->createInstance('bench_where_path', []);
$build = $p->build();
$meta = \Drupal\Core\Cache\CacheableMetadata::createFromRenderArray($build)->merge(\Drupal\Core\Cache\CacheableMetadata::createFromObject($p));`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('output', 'For a request to /node/7 the block renders "You are at: /node/7".', M, String.raw`$req = \Symfony\Component\HttpFoundation\Request::create('/node/7');
$req->setSession(new \Symfony\Component\HttpFoundation\Session\Session(new \Symfony\Component\HttpFoundation\Session\Storage\MockArraySessionStorage()));
\Drupal::requestStack()->push($req);
` + P + String.raw`
$html = (string) \Drupal::service('renderer')->renderInIsolation($build);
print json_encode(['pass' => str_contains(strip_tags($html), 'You are at: /node/7'), 'detail' => strip_tags($html)]);`),
    phpCheck('varies-by-path', 'The block varies by the url.path (or a broader url) cache context.', M, P + String.raw`
$c = $meta->getCacheContexts();
print json_encode(['pass' => (bool) array_intersect(['url.path', 'url'], $c), 'detail' => $c]);`),
    phpCheck('cache-optional', 'The block plugin implements \\Drupal\\Core\\Cache\\CacheOptionalInterface.', M, P + String.raw`
print json_encode($p instanceof \Drupal\Core\Cache\CacheOptionalInterface);`),
    phpCheck('no-block-cache-keys', 'The block view builder adds no #cache keys for a placed instance, so it gets no render cache entry of its own.', M, String.raw`$b = \Drupal\block\Entity\Block::create(['id' => 'bench_where_probe', 'theme' => 'olivero', 'region' => 'content', 'plugin' => 'bench_where_path', 'settings' => ['id' => 'bench_where_path', 'label' => 'You are here', 'label_display' => '0', 'provider' => 'bench_where']]);
$build = \Drupal::entityTypeManager()->getViewBuilder('block')->view($b);
print json_encode(['pass' => empty($build['#cache']['keys']), 'detail' => $build['#cache'] ?? NULL]);`),
    phpCheck('cacheable', 'The block\'s max-age is not 0.', M, P + String.raw`
print json_encode(['pass' => $meta->getCacheMaxAge() !== 0, 'detail' => $meta->getCacheMaxAge()]);`),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['cache-optional', 'no-deprecated-api']);
