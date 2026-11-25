import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_retitle';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('logs-change', 'Creating "Alpha", re-saving it unchanged, then renaming it to "Beta" logs exactly ["Alpha -> Beta"].', M, String.raw`\Drupal::state()->delete('bench_retitle.log');
$n = \Drupal\node\Entity\Node::create(['type' => 'page', 'title' => 'Alpha']); $n->save();
$n->save();
$n->setTitle('Beta'); $n->save();
print json_encode(['pass' => \Drupal::state()->get('bench_retitle.log') === ['Alpha -> Beta'], 'detail' => \Drupal::state()->get('bench_retitle.log')]);`),
    noPattern('no-original-property', 'The module does not read the legacy $entity->original property.', mod(M), /->original\b(?!\s*\()/),
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-original-property', 'no-legacy-pattern', 'no-deprecated-api']);
