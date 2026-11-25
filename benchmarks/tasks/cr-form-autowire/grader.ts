import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_autoform';
const CLS = String.raw`$routes = iterator_to_array(\Drupal::service('router.route_provider')->getRoutesByPattern('/bench-autoform'));
$class = reset($routes)->getDefault('_form');`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'page', kind: 'must', text: 'GET /bench-autoform returns 200 with "Last saved: never" and a note field.',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = await ctx.http('/bench-autoform');
        return { pass: r.status === 200 && /Last saved: never[\s\S]*name="note"/.test(r.body), detail: `status ${r.status}` };
      },
    },
    phpCheck('submit', 'Submitting the form with note "Hi" stores it in state bench_autoform.last.', M, CLS + String.raw`
$fs = (new \Drupal\Core\Form\FormState())->setValues(['note' => 'Hi']);
\Drupal::formBuilder()->submitForm($class, $fs);
print json_encode(['pass' => \Drupal::state()->get('bench_autoform.last') === 'Hi', 'detail' => \Drupal::state()->get('bench_autoform.last')]);`),
    phpCheck('inherited-create', 'The form class does not declare create(); the method comes from core.', M, CLS + String.raw`
$m = new \ReflectionMethod($class, 'create');
print json_encode(['pass' => !str_starts_with($m->getDeclaringClass()->getName(), 'Drupal\bench_autoform'), 'detail' => $m->getDeclaringClass()->getName()]);`),
    noPattern('no-static', 'The module calls \\Drupal::.', mod(M), /\\Drupal::/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['inherited-create', 'no-static', 'no-deprecated-api']);
