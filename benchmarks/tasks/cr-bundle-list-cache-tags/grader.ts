import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_latest';
const BUILD = String.raw`$p = \Drupal::service('plugin.manager.block')->createInstance('bench_latest_articles', []);
$build = $p->build();
$meta = \Drupal\Core\Cache\CacheableMetadata::createFromRenderArray($build)->merge(\Drupal\Core\Cache\CacheableMetadata::createFromObject($p));
$tags = $meta->getCacheTags();`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('lists-articles', 'With four articles and one newer page, the block shows the three newest article titles and not the oldest article or the page.', M, String.raw`$s = \Drupal::entityTypeManager()->getStorage('node');
foreach (['Bench A1', 'Bench A2', 'Bench A3', 'Bench A4'] as $i => $t) { $s->create(['type' => 'article', 'title' => $t, 'status' => 1, 'created' => 1700000000 + $i * 10])->save(); }
$s->create(['type' => 'page', 'title' => 'Bench P1', 'status' => 1, 'created' => 1700000100])->save();
` + BUILD + String.raw`
$html = (string) \Drupal::service('renderer')->renderInIsolation($build);
print json_encode(['pass' => str_contains($html, 'Bench A4') && str_contains($html, 'Bench A2') && !str_contains($html, 'Bench A1') && !str_contains($html, 'Bench P1'), 'detail' => strip_tags($html)]);`),
    phpCheck('bundle-tag', 'The block\'s cache tags include node_list:article.', M, BUILD + String.raw`
print json_encode(['pass' => in_array('node_list:article', $tags, TRUE), 'detail' => $tags]);`),
    phpCheck('no-global-list-tag', 'The block\'s cache tags do not include the global node_list tag, so page edits do not invalidate it.', M, BUILD + String.raw`
print json_encode(['pass' => !in_array('node_list', $tags, TRUE) && !in_array('node_list:page', $tags, TRUE), 'detail' => $tags]);`),
    noPattern('no-hand-built-tag', 'The module does not build a "<type>_list:<bundle>" cache tag string by hand.', mod(M), /['"]node_list:|_list:['"]|['"]_list:/, /\.(php|module)$/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-hand-built-tag', 'no-deprecated-api']);
