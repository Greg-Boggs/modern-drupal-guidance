import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'zbench_reorder';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('field-ui-last', 'field_ui is the last module invoked for form_alter and zbench_reorder runs before it.', M, String.raw`$o = []; \Drupal::moduleHandler()->invokeAllWith("form_alter", function ($h, $m) use (&$o) { $o[] = $m; });` + String.raw`
print json_encode(['pass' => end($o) === 'field_ui' && in_array('zbench_reorder', $o, TRUE), 'detail' => $o]);`),
    noPattern('no-own-order', 'This module\'s own form_alter Hook attribute declares an order.', mod(M), /#\[Hook\(\s*['"]form_alter['"][^\]]*order\s*:/),
    noPattern('no-implements-alter', 'The module implements hook_module_implements_alter().', mod(M), /module_implements_alter/),
    {
      id: 'weight-unchanged', kind: 'must_not', text: 'core.extension gives zbench_reorder or field_ui a non-zero module weight.',
      run: async (ctx) => (ctx.config('core.extension')?.module?.[M] ?? 0) === 0 && (ctx.config('core.extension')?.module?.field_ui ?? 0) === 0,
    },
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-own-order', 'no-implements-alter', 'weight-unchanged', 'no-legacy-pattern', 'no-deprecated-api']);
