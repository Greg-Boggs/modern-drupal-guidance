import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { moduleEnabled, noDeprecatedApis, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_sdc';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('variants', 'The component definition bench_sdc:callout declares variants info ("Information") and warning ("Warning") with the warning description.', M, String.raw`$d = \Drupal::service('plugin.manager.sdc')->getDefinition('bench_sdc:callout', FALSE);
$v = $d['variants'] ?? [];
print json_encode(['pass' => (string) ($v['info']['title'] ?? '') === 'Information' && (string) ($v['warning']['title'] ?? '') === 'Warning' && str_contains((string) ($v['warning']['description'] ?? ''), 'must act on') && !isset($d['props']['properties']['variant']['enum']), 'detail' => $v]);`),
    phpCheck('render-warning', 'Rendering the component with variant warning and message "Disk full" outputs a callout--warning div with the message.', M, String.raw`$b = ['#type' => 'component', '#component' => 'bench_sdc:callout', '#variant' => 'warning', '#props' => ['message' => 'Disk full']];
$html = (string) \Drupal::service('renderer')->renderInIsolation($b);
print json_encode(['pass' => (bool) preg_match('/class="[^"]*callout--warning[^"]*"[^>]*>\s*Disk full/', $html), 'detail' => trim(strip_tags($html, '<div>'))]);`),
    phpCheck('render-default', 'Rendering it without a variant outputs callout--info.', M, String.raw`$b = ['#type' => 'component', '#component' => 'bench_sdc:callout', '#props' => ['message' => 'Hello']];
$html = (string) \Drupal::service('renderer')->renderInIsolation($b);
print json_encode(['pass' => str_contains($html, 'callout--info') && str_contains($html, 'Hello'), 'detail' => trim($html)]);`),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['variants', 'no-deprecated-api']);
