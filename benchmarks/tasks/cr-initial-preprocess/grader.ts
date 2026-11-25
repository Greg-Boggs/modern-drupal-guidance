import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_badge';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('renders', 'Rendering #theme bench_badge with label "New" and color red outputs <span class="badge badge--red">New</span>.', M, String.raw`$b = ['#theme' => 'bench_badge', '#label' => 'New', '#color' => 'red'];
$html = trim((string) \Drupal::service('renderer')->renderInIsolation($b));
print json_encode(['pass' => (bool) preg_match('#<span class="badge badge--red">New</span>#', $html), 'detail' => $html]);`),
    phpCheck('initial-preprocess', 'The theme registry entry for bench_badge has an "initial preprocess" callback.', M, String.raw`$r = \Drupal::service('theme.registry')->get();
print json_encode(['pass' => !empty($r['bench_badge']['initial preprocess']), 'detail' => $r['bench_badge']['initial preprocess'] ?? array_keys($r['bench_badge'] ?? [])]);`),
    noPattern('no-template-preprocess-function', 'The module defines no template_preprocess_bench_badge() function.', mod(M), /function\s+template_preprocess_bench_badge\b/),
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['initial-preprocess', 'no-template-preprocess-function', 'no-legacy-pattern', 'no-deprecated-api']);
