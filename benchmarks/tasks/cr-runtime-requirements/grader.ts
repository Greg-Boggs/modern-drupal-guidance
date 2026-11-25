import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_req';
const LIST = String.raw`$r = \Drupal::service('system.manager')->listRequirements();
$e = $r['bench_req_api_key'] ?? NULL;
$sev = $e['severity'] ?? NULL; $sevName = $sev instanceof \UnitEnum ? $sev->name : $sev;`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('warning', 'With bench_req.api_key empty, the status report has bench_req_api_key titled "Bench API key" with Warning severity and value "Not configured".', M, String.raw`\Drupal::state()->delete('bench_req.api_key');
` + LIST + String.raw`
print json_encode(['pass' => $e && (string) $e['title'] === 'Bench API key' && ($sev === \Drupal\Core\Extension\Requirement\RequirementSeverity::Warning || $sev === 1) && (string) $e['value'] === 'Not configured' && !empty($e['description']), 'detail' => [$sevName, isset($e['value']) ? (string) $e['value'] : NULL]]);`),
    phpCheck('ok', 'With bench_req.api_key set, the entry has OK severity and value "Configured".', M, String.raw`\Drupal::state()->set('bench_req.api_key', 'abc');
` + LIST + String.raw`
\Drupal::state()->delete('bench_req.api_key');
print json_encode(['pass' => $e && ($sev === \Drupal\Core\Extension\Requirement\RequirementSeverity::OK || $sev === 0) && (string) $e['value'] === 'Configured', 'detail' => [$sevName, isset($e['value']) ? (string) $e['value'] : NULL]]);`),
    noPattern('no-legacy-requirements', 'The module does not implement hook_requirements() or use REQUIREMENT_* constants or drupal_requirements_severity().', mod(M), /\bREQUIREMENT_(INFO|OK|WARNING|ERROR)\b|drupal_requirements_severity\s*\(|function\s+bench_req_requirements\s*\(|#\[Hook\(\s*['"]requirements['"]/),
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-requirements', 'no-legacy-pattern', 'no-deprecated-api']);
