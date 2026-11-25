import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_flush';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('counts', 'drupal_flush_all_caches() raises bench_flush.count by exactly 1.', M, String.raw`$before = (int) \Drupal::state()->get('bench_flush.count', 0);
drupal_flush_all_caches();
$after = (int) \Drupal::state()->get('bench_flush.count', 0);
print json_encode(['pass' => $after === $before + 1, 'detail' => [$before, $after]]);`),
    {
      id: 'no-module-file', kind: 'must_not', text: 'web/modules/custom/bench_flush/bench_flush.module exists.',
      run: async (ctx) => !ctx.exists(`${mod(M)}/${M}.module`),
    },
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-module-file', 'no-legacy-pattern', 'no-deprecated-api']);
