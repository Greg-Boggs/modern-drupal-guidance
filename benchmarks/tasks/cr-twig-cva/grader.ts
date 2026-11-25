import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { hasPattern, mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_button';
const R = (vars: string) => String.raw`$b = ['#theme' => 'bench_button', '#label' => 'Go'${vars}];
$html = (string) \Drupal::service('renderer')->renderInIsolation($b);
preg_match('/<button[^>]*class="([^"]*)"/', $html, $m);
$c = preg_split('/\s+/', trim($m[1] ?? ''));`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('danger-lg', 'Rendering intent danger, size lg gives a button with classes btn, btn--danger and btn--lg and the label.', M, R(", '#intent' => 'danger', '#size' => 'lg'") + String.raw`
print json_encode(['pass' => !array_diff(['btn', 'btn--danger', 'btn--lg'], $c) && !in_array('btn--primary', $c) && str_contains($html, 'Go'), 'detail' => $c]);`),
    phpCheck('defaults', 'Rendering with no intent or size gives btn, btn--primary and btn--sm.', M, R('') + String.raw`
print json_encode(['pass' => !array_diff(['btn', 'btn--primary', 'btn--sm'], $c), 'detail' => $c]);`),
    hasPattern('uses-cva', 'The module\'s Twig template calls html_cva().', mod(M), /html_cva\s*\(/, /\.twig$/),
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['uses-cva', 'no-legacy-pattern', 'no-deprecated-api']);
