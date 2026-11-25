import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { moduleEnabled, noDeprecatedApis, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_stats';
const P = String.raw`$p = \Drupal::service('plugin.manager.block')->createInstance('bench_stats_count', []);`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('count', 'With two published nodes and one unpublished node, the block renders "Published content: 2" and carries the node_list cache tag.', M, String.raw`$s = \Drupal::entityTypeManager()->getStorage('node');
$s->create(['type' => 'page', 'title' => 'S1', 'status' => 1])->save();
$s->create(['type' => 'article', 'title' => 'S2', 'status' => 1])->save();
$s->create(['type' => 'page', 'title' => 'S3', 'status' => 0])->save();
` + P + String.raw`
$build = $p->build();
$tags = \Drupal\Core\Cache\CacheableMetadata::createFromRenderArray($build)->merge(\Drupal\Core\Cache\CacheableMetadata::createFromObject($p))->getCacheTags();
$html = (string) \Drupal::service('renderer')->renderInIsolation($build);
print json_encode(['pass' => str_contains($html, 'Published content: 2') && in_array('node_list', $tags, TRUE), 'detail' => [strip_tags($html), $tags]]);`),
    phpCheck('placeholder', 'The block plugin\'s createPlaceholder() returns TRUE.', M, P + String.raw`
print json_encode(method_exists($p, 'createPlaceholder') && $p->createPlaceholder() === TRUE);`),
    phpCheck('view-builder', 'Building a placed instance through the block view builder yields a #create_placeholder render array.', M, String.raw`$b = \Drupal\block\Entity\Block::create(['id' => 'bench_stats_probe', 'theme' => 'olivero', 'region' => 'content', 'plugin' => 'bench_stats_count', 'settings' => ['id' => 'bench_stats_count', 'label' => 'Content count', 'label_display' => '0', 'provider' => 'bench_stats']]);
$build = \Drupal::entityTypeManager()->getViewBuilder('block')->view($b);
print json_encode(['pass' => !empty($build['#create_placeholder']), 'detail' => array_keys($build)]);`),
    phpCheck('cacheable', 'The block\'s max-age is not 0.', M, P + String.raw`
$build = $p->build();
$age = \Drupal\Core\Cache\CacheableMetadata::createFromRenderArray($build)->merge(\Drupal\Core\Cache\CacheableMetadata::createFromObject($p))->getCacheMaxAge();
print json_encode(['pass' => $age !== 0, 'detail' => $age]);`),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['placeholder', 'no-deprecated-api']);
