import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_apifilter';
const INVOKE = String.raw`$et = \Drupal::entityTypeManager()->getDefinition('user');
$res = [];
\Drupal::moduleHandler()->invokeAllWith('jsonapi_user_filter_access', function (callable $h, string $module) use (&$res, $et, $acct) { if ($module === 'bench_apifilter') { $res = $h($et, $acct); } });`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('allowed', 'For an account with "access user profiles", the module\'s hook returns an allowed result keyed filter_among_enabled.', M, String.raw`$r = \Drupal\user\Entity\Role::create(['id' => 'bench_profiles', 'label' => 'P']); $r->grantPermission('access user profiles'); $r->save();
$acct = \Drupal\user\Entity\User::create(['name' => 'p' . rand(), 'status' => 1, 'roles' => ['bench_profiles']]); $acct->save();
` + INVOKE + String.raw`
print json_encode(['pass' => isset($res['filter_among_enabled']) && $res['filter_among_enabled']->isAllowed(), 'detail' => array_keys($res ?: [])]);`),
    phpCheck('not-allowed', 'For an account without that permission the result is not allowed.', M, String.raw`$acct = \Drupal\user\Entity\User::create(['name' => 'q' . rand(), 'status' => 1]); $acct->save();
` + INVOKE + String.raw`
print json_encode(['pass' => !isset($res['filter_among_enabled']) || !$res['filter_among_enabled']->isAllowed(), 'detail' => array_keys($res ?: [])]);`),
    noPattern('no-deprecated-constants', 'The module does not use the deprecated JSONAPI_FILTER_* global constants.', mod(M), /\bJSONAPI_FILTER_[A-Z_]+/),
    noPattern('no-literal-key', 'The module does not hard-code the "filter_among_*" key string.', mod(M), /['"]filter_among_\w+['"]/),
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-deprecated-constants', 'no-literal-key', 'no-legacy-pattern', 'no-deprecated-api']);
