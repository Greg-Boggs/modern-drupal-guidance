import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_ops';
const OPS = (uid: string) => String.raw`$n = \Drupal::entityTypeManager()->getStorage('node')->create(['type' => 'page', 'title' => 'Ops', 'status' => 1]); $n->save();
\Drupal::service('account_switcher')->switchTo(${uid});
$c = new \Drupal\Core\Cache\CacheableMetadata();
$ops = \Drupal::entityTypeManager()->getListBuilder('node')->getOperations($n, $c);`;
const WITH_PERM = String.raw`(function () { $r = \Drupal\user\Entity\Role::create(['id' => 'bench_reporter', 'label' => 'Reporter']); $r->grantPermission('view bench report'); $r->grantPermission('access content'); $r->save(); $u = \Drupal\user\Entity\User::create(['name' => 'reporter' . rand(), 'status' => 1, 'roles' => ['bench_reporter']]); $u->save(); return $u; })()`;
const WITHOUT = String.raw`(function () { $u = \Drupal\user\Entity\User::create(['name' => 'plain' . rand(), 'status' => 1]); $u->save(); return $u; })()`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('permission', 'The permission "view bench report" is defined.', M, String.raw`print json_encode(array_key_exists('view bench report', \Drupal::service('user.permissions')->getPermissions()));`),
    phpCheck('op-with-permission', 'For a user with the permission, the node\'s operations include bench_report titled "Report" linking to the node.', M, OPS(WITH_PERM) + String.raw`
$o = $ops['bench_report'] ?? NULL;
print json_encode(['pass' => $o && (string) $o['title'] === 'Report' && $o['url']->toString() === $n->toUrl()->toString(), 'detail' => array_keys($ops)]);`),
    phpCheck('no-op-without-permission', 'For a user without the permission, bench_report is absent.', M, OPS(WITHOUT) + String.raw`
print json_encode(['pass' => !isset($ops['bench_report']), 'detail' => array_keys($ops)]);`),
    phpCheck('cacheability', 'The cacheability passed to getOperations() gains the user.permissions cache context for a user without the permission.', M, OPS(WITHOUT) + String.raw`
print json_encode(['pass' => in_array('user.permissions', $c->getCacheContexts(), TRUE), 'detail' => $c->getCacheContexts()]);`),
    noPattern('no-max-age-zero', 'The module does not make the operations uncacheable with max-age 0.', mod(M), /max-age['"]\s*\]?\s*=>?\s*0\b|mergeCacheMaxAge\(\s*0\s*\)|setCacheMaxAge\(\s*0\s*\)/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-max-age-zero', 'no-deprecated-api']);
