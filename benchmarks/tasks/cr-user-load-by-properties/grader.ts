import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_finder';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('find', 'byMail() and byName() return the matching account, and NULL for unknown values.', M, String.raw`$u = \Drupal\user\Entity\User::create(['name' => 'finder_x', 'mail' => 'finder_x@example.com', 'status' => 1]); $u->save();
$f = \Drupal::service('bench_finder.users');
print json_encode(['pass' => $f->byMail('finder_x@example.com')?->id() == $u->id() && $f->byName('finder_x')?->id() == $u->id() && $f->byMail('nobody@example.com') === NULL && $f->byName('nobody_here') === NULL]);`),
    noPattern('no-legacy-api', 'The module does not call user_load_by_mail() or user_load_by_name().', mod(M), /\buser_load_by_(mail|name)\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
