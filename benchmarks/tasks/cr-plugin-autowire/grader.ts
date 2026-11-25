import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_users';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('renders', 'The block renders "Users: N" with N equal to the number of non-anonymous accounts.', M, String.raw`$n = (int) \Drupal::entityQuery('user')->accessCheck(FALSE)->condition('uid', 0, '>')->count()->execute();
$p = \Drupal::service('plugin.manager.block')->createInstance('bench_users_count', []);
$html = (string) \Drupal::service('renderer')->renderInIsolation($p->build());
print json_encode(['pass' => str_contains(strip_tags($html), 'Users: ' . $n), 'detail' => strip_tags($html)]);`),
    phpCheck('inherited-create', 'The block class does not declare create(); the method comes from core.', M, String.raw`$p = \Drupal::service('plugin.manager.block')->createInstance('bench_users_count', []);
$m = new \ReflectionMethod($p, 'create');
print json_encode(['pass' => !str_starts_with($m->getDeclaringClass()->getName(), 'Drupal\bench_users'), 'detail' => $m->getDeclaringClass()->getName()]);`),
    noPattern('no-static', 'The module calls \\Drupal::.', mod(M), /\\Drupal::/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['inherited-create', 'no-static', 'no-deprecated-api']);
