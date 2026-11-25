import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_members';
const SETUP = String.raw`if (!\Drupal\user\Entity\Role::load('member')) { \Drupal\user\Entity\Role::create(['id' => 'member', 'label' => 'Member'])->save(); }
$s = \Drupal::service('bench_members.access');`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('member', 'An active account with the member role gets an allowed result.', M, SETUP + String.raw`
$u = \Drupal\user\Entity\User::create(['name' => 'm' . rand(), 'status' => 1, 'roles' => ['member']]); $u->save();
print json_encode($s->check($u)->isAllowed());`),
    phpCheck('neutral-reason', 'An active account without the role gets a neutral result whose reason is "Only members can see this content."', M, SETUP + String.raw`
$u = \Drupal\user\Entity\User::create(['name' => 'n' . rand(), 'status' => 1]); $u->save();
$r = $s->check($u);
print json_encode(['pass' => $r->isNeutral() && $r instanceof \Drupal\Core\Access\AccessResultReasonInterface && $r->getReason() === 'Only members can see this content.', 'detail' => [get_class($r), $r instanceof \Drupal\Core\Access\AccessResultReasonInterface ? $r->getReason() : NULL]]);`),
    phpCheck('forbidden-reason', 'A blocked account without the role gets a forbidden result whose reason is "Blocked accounts cannot see member content."', M, SETUP + String.raw`
$u = \Drupal\user\Entity\User::create(['name' => 'b' . rand(), 'status' => 0]); $u->save();
$r = $s->check($u);
print json_encode(['pass' => $r->isForbidden() && $r->getReason() === 'Blocked accounts cannot see member content.', 'detail' => [get_class($r), method_exists($r, 'getReason') ? $r->getReason() : NULL]]);`),
    phpCheck('cacheability', 'The neutral result carries the user.roles cache context (or a broader user context).', M, SETUP + String.raw`
$u = \Drupal\user\Entity\User::create(['name' => 'c' . rand(), 'status' => 1]); $u->save();
$c = $s->check($u)->getCacheContexts();
print json_encode(['pass' => (bool) array_intersect(['user.roles', 'user'], $c), 'detail' => $c]);`),
    noPattern('no-hand-built-neutral', 'The module does not build results with AccessResult::neutral().', mod(M), /AccessResult::neutral\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-hand-built-neutral', 'no-deprecated-api']);
