import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_hidden';
const R = (flag: string) => String.raw`$b = \Drupal::service('bench_hidden.builder')->build(${flag});
$keep = isset($b['secret']);
$html = (string) \Drupal::service('renderer')->renderInIsolation($b);`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('hidden', 'build(FALSE) keeps the secret child in the array and renders "Welcome." and "Goodbye." but not "Staff only."', M, R('FALSE') + String.raw`
print json_encode(['pass' => $keep && str_contains($html, 'Welcome.') && str_contains($html, 'Goodbye.') && !str_contains($html, 'Staff only.'), 'detail' => strip_tags($html)]);`),
    phpCheck('shown', 'build(TRUE) renders all three texts.', M, R('TRUE') + String.raw`
print json_encode(['pass' => str_contains($html, 'Welcome.') && str_contains($html, 'Staff only.') && str_contains($html, 'Goodbye.'), 'detail' => strip_tags($html)]);`),
    phpCheck('no-access-change', 'build(FALSE) does not set #access on the secret child.', M, String.raw`$b = \Drupal::service('bench_hidden.builder')->build(FALSE);
print json_encode(!array_key_exists('#access', $b['secret'] ?? []));`),
    noPattern('no-hide-show', 'The module does not call hide() or show().', mod(M), /(?<![\w>:$\\])(hide|show)\s*\(\s*\$/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-hide-show', 'no-deprecated-api']);
