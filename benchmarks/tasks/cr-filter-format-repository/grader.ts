import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_formats';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('formats', 'For anonymous and for user 1, formatIds() and defaultFormatId() match core\'s filter format repository.', M, String.raw`$repo = \Drupal::service('Drupal\filter\FilterFormatRepositoryInterface'); $l = \Drupal::service('bench_formats.lister');
$ok = TRUE; $d = [];
foreach ([\Drupal\user\Entity\User::getAnonymousUser(), \Drupal\user\Entity\User::load(1)] as $a) { $ok = $ok && $l->formatIds($a) === array_keys($repo->getFormatsForAccount($a)) && $l->defaultFormatId($a) === $repo->getDefaultFormat($a)->id(); $d[] = $l->formatIds($a); }
print json_encode(['pass' => $ok && in_array('full_html', $d[1]) && !in_array('full_html', $d[0]), 'detail' => $d]);`),
    noPattern('no-legacy-api', 'The module does not call the deprecated filter_*() format functions.', mod(M), /\bfilter_(formats|formats_reset|get_formats_by_role|default_format|fallback_format)\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
