import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { moduleEnabled, noDeprecatedApis, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_notice';
const P = String.raw`$p = \Drupal::service('plugin.manager.block')->createInstance('bench_notice_banner', []);
$build = $p->build();
$find = function (array $a) use (&$find) { if (isset($a['#lazy_builder'])) return $a; foreach (\Drupal\Core\Render\Element::children($a) as $k) { if ($r = $find($a[$k])) return $r; } return NULL; };
$lazy = $find($build);`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('lazy-builder', 'build() returns a #lazy_builder element with #create_placeholder TRUE.', M, P + String.raw`
print json_encode(['pass' => $lazy !== NULL && !empty($lazy['#create_placeholder']), 'detail' => $lazy ? array_keys($lazy) : array_keys($build)]);`),
    phpCheck('renders', 'Calling the lazy builder callback renders "Scheduled maintenance on Sunday."', M, P + String.raw`
if (!$lazy) { print json_encode(FALSE); return; }
$cb = \Drupal::service('callable_resolver')->getCallableFromDefinition($lazy['#lazy_builder'][0]);
$out = $cb(...$lazy['#lazy_builder'][1]);
$html = (string) \Drupal::service('renderer')->renderInIsolation($out);
print json_encode(['pass' => str_contains($html, 'Scheduled maintenance on Sunday.'), 'detail' => $html]);`),
    phpCheck('denylist-bigpipe', 'The element denies the BigPipe placeholder strategy (#placeholder_strategy_denylist has BigPipeStrategy::class => TRUE).', M, P + String.raw`
$d = $lazy['#placeholder_strategy_denylist'] ?? [];
print json_encode(['pass' => !empty($d['Drupal\big_pipe\Render\Placeholder\BigPipeStrategy']), 'detail' => $d]);`),
    phpCheck('placeholder-survives', 'The render pipeline keeps the denylist on the generated placeholder.', M, P + String.raw`
if (!$lazy) { print json_encode(FALSE); return; }
$el = \Drupal::service('render_placeholder_generator')->createPlaceholder($lazy);
$ph = reset($el['#attached']['placeholders']);
print json_encode(['pass' => !empty($ph['#placeholder_strategy_denylist']['Drupal\big_pipe\Render\Placeholder\BigPipeStrategy']), 'detail' => array_keys($ph)]);`),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['denylist-bigpipe', 'no-deprecated-api']);
