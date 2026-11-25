import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_editorinfo';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('lookup', 'editorFor(\'basic_html\') is "ckeditor5" and editorFor(\'plain_text\') is NULL.', M, String.raw`$l = \Drupal::service('bench_editorinfo.lookup');
print json_encode(['pass' => $l->editorFor('basic_html') === 'ckeditor5' && $l->editorFor('plain_text') === NULL, 'detail' => [$l->editorFor('basic_html'), $l->editorFor('plain_text')]]);`),
    noPattern('no-legacy-api', 'The module does not call editor_load().', mod(M), /\beditor_load\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
