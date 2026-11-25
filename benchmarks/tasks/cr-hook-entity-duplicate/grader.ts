import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_dup';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('duplicate', 'createDuplicate() of a published page "Report" returns an unsaved, unpublished node titled "Report (copy)", and the original keeps its title and status.', M, String.raw`$n = \Drupal\node\Entity\Node::create(['type' => 'page', 'title' => 'Report', 'status' => 1]); $n->save();
$d = $n->createDuplicate();
print json_encode(['pass' => $d->isNew() && $d->label() === 'Report (copy)' && !$d->isPublished() && $n->label() === 'Report' && $n->isPublished(), 'detail' => [$d->label(), $d->isPublished()]]);`),
    noPattern('no-save-hooks', 'The module does not implement presave or insert hooks for this.', mod(M), /#\[Hook\(\s*['"](node|entity)_(presave|insert)['"]/),
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-save-hooks', 'no-legacy-pattern', 'no-deprecated-api']);
