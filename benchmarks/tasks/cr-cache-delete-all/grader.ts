import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_reports';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('bin', 'cache.bench_reports is a cache backend and save() writes to it.', M, String.raw`$b = \Drupal::service('cache.bench_reports');
\Drupal::service('bench_reports.store')->save('r1', ['a' => 1]);
print json_encode(['pass' => $b instanceof \Drupal\Core\Cache\CacheBackendInterface && ($b->get('r1')->data ?? NULL) === ['a' => 1]]);`),
    phpCheck('reset', 'After reset(), get(\'r1\', TRUE) (allowing invalid items) returns FALSE.', M, String.raw`$s = \Drupal::service('bench_reports.store'); $s->save('r1', ['a' => 1]); $s->save('r2', ['b' => 2]);
$s->reset();
$b = \Drupal::service('cache.bench_reports');
print json_encode(['pass' => $b->get('r1', TRUE) === FALSE && $b->get('r2', TRUE) === FALSE]);`),
    noPattern('no-invalidate-all', 'The module calls invalidateAll() or truncates cache tables directly.', mod(M), /->invalidateAll\s*\(|->truncate\s*\(|TRUNCATE/i),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-invalidate-all', 'no-deprecated-api']);
