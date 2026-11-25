import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_types';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('names', 'nodeTypeNames() returns article => Article and page => Basic page, and includes a content type created by the grader.', M, String.raw`\Drupal\node\Entity\NodeType::create(['type' => 'bench_extra', 'name' => 'Bench extra'])->save();
$n = array_map('strval', \Drupal::service('bench_types.lister')->nodeTypeNames());
print json_encode(['pass' => ($n['article'] ?? NULL) === 'Article' && ($n['page'] ?? NULL) === 'Basic page' && ($n['bench_extra'] ?? NULL) === 'Bench extra', 'detail' => $n]);`),
    noPattern('no-legacy-api', 'The module does not call node_type_get_names().', mod(M), /\bnode_type_get_names\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
