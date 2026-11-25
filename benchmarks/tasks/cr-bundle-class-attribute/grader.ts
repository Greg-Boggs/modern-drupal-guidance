import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_bundle';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('article-class', 'An article node is an instance of Drupal\\bench_bundle\\Entity\\Article and shout() returns the upper-cased title.', M, String.raw`$n = \Drupal\node\Entity\Node::create(['type' => 'article', 'title' => 'Hello bundle']); $n->save();
$l = \Drupal::entityTypeManager()->getStorage('node')->loadUnchanged($n->id());
print json_encode(['pass' => get_class($l) === 'Drupal\bench_bundle\Entity\Article' && $l->shout() === 'HELLO BUNDLE', 'detail' => get_class($l)]);`),
    phpCheck('page-plain', 'A basic page node is a plain Drupal\\node\\Entity\\Node.', M, String.raw`$n = \Drupal\node\Entity\Node::create(['type' => 'page', 'title' => 'P']);
print json_encode(['pass' => get_class($n) === 'Drupal\node\Entity\Node', 'detail' => get_class($n)]);`),
    noPattern('no-bundle-hooks', 'The module implements no entity_bundle_info, entity_bundle_info_alter or entity_type_alter hook.', mod(M), /#\[Hook\(\s*['"]entity_(bundle_info(_alter)?|type_alter|type_build)['"]|function\s+bench_bundle_entity_(bundle_info|type)/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-bundle-hooks', 'no-deprecated-api']);
