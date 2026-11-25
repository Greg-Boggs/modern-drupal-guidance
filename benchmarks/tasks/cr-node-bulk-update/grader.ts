import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_bulk';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('unpublish', 'unpublishType(\'article\') unpublishes two published articles and leaves a published page published.', M, String.raw`$s = \Drupal::entityTypeManager()->getStorage('node');
$a1 = $s->create(['type' => 'article', 'title' => 'A1', 'status' => 1]); $a1->save();
$a2 = $s->create(['type' => 'article', 'title' => 'A2', 'status' => 1]); $a2->save();
$p = $s->create(['type' => 'page', 'title' => 'P', 'status' => 1]); $p->save();
\Drupal::service('bench_bulk.updater')->unpublishType('article');
$s->resetCache();
print json_encode(['pass' => !$s->load($a1->id())->isPublished() && !$s->load($a2->id())->isPublished() && $s->load($p->id())->isPublished(), 'detail' => [$s->load($a1->id())->isPublished(), $s->load($p->id())->isPublished()]]);`),
    noPattern('no-legacy-api', 'The module does not call node_mass_update() or include node.admin.inc.', mod(M), /\bnode_mass_update\s*\(|node\.admin\.inc/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
