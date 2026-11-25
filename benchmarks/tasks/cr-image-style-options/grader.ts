import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_styles';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('options', 'options(TRUE) and options(FALSE) equal core\'s ImageDerivativeUtilities::styleOptions() and include thumbnail.', M, String.raw`$u = \Drupal::service('Drupal\image\ImageDerivativeUtilities'); $s = \Drupal::service('bench_styles.options');
$a = array_map('strval', $s->options(TRUE)); $b = array_map('strval', $s->options(FALSE));
print json_encode(['pass' => $a === array_map('strval', $u->styleOptions(TRUE)) && $b === array_map('strval', $u->styleOptions(FALSE)) && isset($b['thumbnail']), 'detail' => $b]);`),
    noPattern('no-legacy-api', 'The module does not call image_style_options() or image_path_flush() or use IMAGE_DERIVATIVE_TOKEN.', mod(M), /\bimage_style_options\s*\(|\bimage_path_flush\s*\(|\bIMAGE_DERIVATIVE_TOKEN\b/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
