import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_typedesc';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('description', 'description() returns the article type\'s description and the text of a type created by the grader.', M, String.raw`\Drupal\node\Entity\NodeType::create(['type' => 'bench_desc', 'name' => 'Desc', 'description' => 'Grader description.'])->save();
$h = \Drupal::service('bench_typedesc.helper');
print json_encode(['pass' => $h->description('bench_desc') === 'Grader description.' && $h->description('article') === (string) \Drupal\node\Entity\NodeType::load('article')->getDescription(), 'detail' => $h->description('bench_desc')]);`),
    noPattern('no-legacy-api', 'The module does not call node_type_get_description().', mod(M), /\bnode_type_get_description\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
