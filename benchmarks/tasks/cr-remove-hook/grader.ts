import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_nohelp';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('removed', 'announcements_feed no longer has a help implementation, while it stays enabled.', M, String.raw`$mh = \Drupal::moduleHandler();
$has = FALSE; $mh->invokeAllWith('help', function ($h, $m) use (&$has) { if ($m === 'announcements_feed') { $has = TRUE; } });
print json_encode(['pass' => !$has && $mh->moduleExists('announcements_feed'), 'detail' => $has]);`),
    phpCheck('others-kept', 'Other modules\' help hooks still run (node has a help implementation).', M, String.raw`$has = FALSE; \Drupal::moduleHandler()->invokeAllWith('help', function ($h, $m) use (&$has) { if ($m === 'node') { $has = TRUE; } });
print json_encode($has);`),
    noPattern('no-implements-alter', 'The module implements hook_module_implements_alter().', mod(M), /module_implements_alter/),
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-implements-alter', 'no-legacy-pattern', 'no-deprecated-api']);
