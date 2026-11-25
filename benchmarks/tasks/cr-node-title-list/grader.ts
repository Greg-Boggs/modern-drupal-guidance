import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_titles';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('links', 'build([second, first], "Picks") renders links to both nodes in that order under "Picks", and carries node:N tags for both.', M, String.raw`$a = \Drupal\node\Entity\Node::create(['type' => 'page', 'title' => 'First pick', 'status' => 1]); $a->save();
$b = \Drupal\node\Entity\Node::create(['type' => 'page', 'title' => 'Second pick', 'status' => 1]); $b->save();
$build = \Drupal::service('bench_titles.builder')->build([$b->id(), $a->id()], 'Picks');
$tags = \Drupal\Core\Cache\CacheableMetadata::createFromRenderArray($build)->getCacheTags();
$html = (string) \Drupal::service('renderer')->renderInIsolation($build);
$pa = strpos($html, '>First pick</a>'); $pb = strpos($html, '>Second pick</a>');
print json_encode(['pass' => $pa !== FALSE && $pb !== FALSE && $pb < $pa && str_contains($html, 'Picks') && str_contains($html, 'href="/node/' . $a->id() . '"') && in_array('node:' . $a->id(), $tags) && in_array('node:' . $b->id(), $tags), 'detail' => [strip_tags($html), $tags]]);`),
    noPattern('no-legacy-api', 'The module does not call node_title_list().', mod(M), /\bnode_title_list\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
