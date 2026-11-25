import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_grantinfo';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('grants', 'grants(\'view\', $user) equals core\'s NodeGrantsHelper::nodeAccessGrants(\'view\', $user) for user 1 and for anonymous.', M, String.raw`$r = \Drupal::service('bench_grantinfo.reporter'); $h = \Drupal::service('Drupal\node\NodeGrantsHelper');
$a = \Drupal\user\Entity\User::load(1); $b = \Drupal\user\Entity\User::getAnonymousUser();
print json_encode(['pass' => $r->grants('view', $a) == $h->nodeAccessGrants('view', $a) && $r->grants('view', $b) == $h->nodeAccessGrants('view', $b), 'detail' => $r->grants('view', $b)]);`),
    phpCheck('view-all', 'canViewAll() matches the node access control handler\'s checkAllGrants() (TRUE on the base app with no node access modules).', M, String.raw`$r = \Drupal::service('bench_grantinfo.reporter'); $u = \Drupal\user\Entity\User::getAnonymousUser();
$want = (bool) \Drupal::entityTypeManager()->getAccessControlHandler('node')->checkAllGrants($u);
print json_encode(['pass' => $r->canViewAll($u) === $want && $want === TRUE, 'detail' => [$r->canViewAll($u), $want]]);`),
    noPattern('no-procedural', 'The module does not call node_access_grants() or node_access_view_all_nodes().', mod(M), /\bnode_access_(grants|view_all_nodes)\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-procedural', 'no-deprecated-api']);
