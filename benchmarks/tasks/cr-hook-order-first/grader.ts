import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'zbench_first';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('first', 'zbench_first is the first module invoked for form_alter, ahead of field_ui.', M, String.raw`$o = []; \Drupal::moduleHandler()->invokeAllWith("form_alter", function ($h, $m) use (&$o) { $o[] = $m; });` + String.raw`
print json_encode(['pass' => ($o[0] ?? NULL) === 'zbench_first' && in_array('field_ui', $o, TRUE), 'detail' => $o]);`),
    phpCheck('alters', 'Building the user login form sets #zbench_first.', M, String.raw`$f = \Drupal::formBuilder()->getForm('Drupal\user\Form\UserLoginForm');
print json_encode(!empty($f['#zbench_first']));`),
    {
      id: 'weight-unchanged', kind: 'must_not', text: 'core.extension gives zbench_first a non-zero module weight.',
      run: async (ctx) => (ctx.config('core.extension')?.module?.[M] ?? 0) === 0,
    },
    noPattern('no-implements-alter', 'The module implements hook_module_implements_alter().', mod(M), /module_implements_alter/),
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['weight-unchanged', 'no-implements-alter', 'no-legacy-pattern', 'no-deprecated-api']);
