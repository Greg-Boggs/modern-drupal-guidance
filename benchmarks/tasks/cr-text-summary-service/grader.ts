import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_summary';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('summary', 'summarize() returns the same string as core\'s TextSummary service for two inputs.', M, String.raw`$t = '<p>First sentence here. Second sentence is longer than the first one.</p><p>Another paragraph.</p>';
$core = \Drupal::service('Drupal\text\TextSummary');
$s = \Drupal::service('bench_summary.teaser');
print json_encode(['pass' => $s->summarize($t, 30) === (string) $core->generate($t, NULL, 30) && $s->summarize($t, 80) === (string) $core->generate($t, NULL, 80), 'detail' => $s->summarize($t, 30)]);`),
    noPattern('no-legacy-api', 'The module does not call text_summary().', mod(M), /\btext_summary\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
