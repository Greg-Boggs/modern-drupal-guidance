import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_login';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('valid', 'loginUrl() returns an absolute /user/reset/{uid}/{timestamp}/{hash} URL whose hash matches core\'s OneTimeAuthentication::generateHmac() for that user and timestamp.', M, String.raw`$u = \Drupal\user\Entity\User::create(['name' => 'otl' . rand(), 'mail' => 'otl' . rand() . '@example.com', 'status' => 1]); $u->save();
$url = \Drupal::service('bench_login.links')->loginUrl($u);
$ok = (bool) preg_match('#^https?://[^/]+.*/user/reset/(\d+)/(\d+)/([\w-]+)#', $url, $m);
$valid = $ok && (int) $m[1] === (int) $u->id() && hash_equals(\Drupal::service('Drupal\user\OneTimeAuthentication')->generateHmac($u, (int) $m[2]), $m[3]);
print json_encode(['pass' => $valid, 'detail' => $url]);`),
    noPattern('no-legacy-api', 'The module does not call user_pass_reset_url(), user_pass_rehash(), user_cancel_url() or user_mail_tokens().', mod(M), /\buser_(pass_rehash|cancel_url|mail_tokens|pass_reset_url)\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
