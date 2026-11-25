import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_fileuse';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('image-field', 'nodeIds() returns the ID of an article that uses the file in its image field, and not an unrelated article.', M, String.raw`file_put_contents('public://bench-use.png', base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='));
$f = \Drupal\file\Entity\File::create(['uri' => 'public://bench-use.png', 'status' => 1]); $f->save();
$n = \Drupal\node\Entity\Node::create(['type' => 'article', 'title' => 'With image', 'field_image' => ['target_id' => $f->id(), 'alt' => 'x']]); $n->save();
\Drupal\node\Entity\Node::create(['type' => 'article', 'title' => 'Without'])->save();
$ids = \Drupal::service('bench_fileuse.finder')->nodeIds($f);
print json_encode(['pass' => $ids == [(int) $n->id()], 'detail' => $ids]);`),
    noPattern('no-legacy-api', 'The module does not call file_get_file_references().', mod(M), /\bfile_get_file_references\s*\(|\bfile_field_find_file_reference_column\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
