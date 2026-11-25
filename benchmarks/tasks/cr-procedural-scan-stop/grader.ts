import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_helpers';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('helpers', 'bench_helpers_help() and bench_helpers_cron_label() exist and return their strings.', M, String.raw`\Drupal::moduleHandler()->load('bench_helpers');
print json_encode(function_exists('bench_helpers_help') && bench_helpers_help() === 'Helper text.' && bench_helpers_cron_label() === 'Nightly');`),
    phpCheck('not-a-hook', 'bench_helpers has no help implementation registered.', M, String.raw`$has = FALSE; \Drupal::moduleHandler()->invokeAllWith('help', function ($h, $m) use (&$has) { if ($m === 'bench_helpers') { $has = TRUE; } });
print json_encode(!$has);`),
    noPattern('no-old-names', 'The module uses the renamed-away hooks_converted parameter or StopProceduralHookScan attribute.', mod(M), /hooks_converted|StopProceduralHookScan/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-old-names', 'no-deprecated-api']);
