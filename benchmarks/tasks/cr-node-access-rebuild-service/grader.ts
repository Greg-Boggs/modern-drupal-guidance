import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_grants';
const S = String.raw`$s = \Drupal::service('bench_grants.maintenance'); $core = \Drupal::service('Drupal\node\NodeAccessRebuild');`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('flag', 'flag() makes core report that node access needs a rebuild, and isFlagged() returns TRUE.', M, S + String.raw`
$core->setNeedsRebuild(FALSE);
$s->flag();
print json_encode(['pass' => $core->needsRebuild() === TRUE && $s->isFlagged() === TRUE, 'detail' => [$core->needsRebuild(), $s->isFlagged()]]);`),
    phpCheck('rebuild', 'rebuildNow() leaves core reporting no pending rebuild, isFlagged() FALSE, and the node_access table holding the default grant.', M, S + String.raw`
$core->setNeedsRebuild(TRUE);
$s->rebuildNow();
$rows = \Drupal::database()->select('node_access')->countQuery()->execute()->fetchField();
print json_encode(['pass' => $core->needsRebuild() === FALSE && $s->isFlagged() === FALSE && $rows >= 1, 'detail' => [$core->needsRebuild(), $rows]]);`),
    noPattern('no-procedural', 'The module does not call node_access_rebuild() or node_access_needs_rebuild().', mod(M), /\bnode_access_(needs_)?rebuild\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-procedural', 'no-deprecated-api']);
