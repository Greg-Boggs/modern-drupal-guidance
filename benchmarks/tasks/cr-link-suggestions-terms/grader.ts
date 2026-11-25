import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_termlinks';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('tags-suggested', 'Bundle info for taxonomy_term tags has ckeditor5_link_suggestions TRUE.', M, String.raw`\Drupal::service('entity_type.bundle.info')->clearCachedBundles();
$i = \Drupal::service('entity_type.bundle.info')->getBundleInfo('taxonomy_term');
print json_encode(['pass' => ($i['tags']['ckeditor5_link_suggestions'] ?? FALSE) === TRUE, 'detail' => $i['tags'] ?? NULL]);`),
    phpCheck('others-unchanged', 'A second vocabulary created in the grader does not get link suggestions, and user accounts do not.', M, String.raw`\Drupal\taxonomy\Entity\Vocabulary::create(['vid' => 'bench_other', 'name' => 'Other'])->save();
\Drupal::service('entity_type.bundle.info')->clearCachedBundles();
$t = \Drupal::service('entity_type.bundle.info')->getBundleInfo('taxonomy_term');
$u = \Drupal::service('entity_type.bundle.info')->getBundleInfo('user');
print json_encode(['pass' => empty($t['bench_other']['ckeditor5_link_suggestions']) && empty($u['user']['ckeditor5_link_suggestions']), 'detail' => [$t['bench_other'] ?? NULL, $u['user'] ?? NULL]]);`),
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-pattern', 'no-deprecated-api']);
