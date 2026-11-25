import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_typelabel';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('label', 'label() returns "Article" for an article and "Basic page" for a page.', M, String.raw`$h = \Drupal::service('bench_typelabel.helper');
$a = \Drupal\node\Entity\Node::create(['type' => 'article', 'title' => 'A']); $p = \Drupal\node\Entity\Node::create(['type' => 'page', 'title' => 'P']);
print json_encode(['pass' => $h->label($a) === 'Article' && $h->label($p) === 'Basic page', 'detail' => [$h->label($a), $h->label($p)]]);`),
    noPattern('no-legacy-api', 'The module does not call node_get_type_label().', mod(M), /\bnode_get_type_label\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
