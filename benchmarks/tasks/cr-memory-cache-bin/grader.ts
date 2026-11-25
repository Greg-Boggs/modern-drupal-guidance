import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_memo';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('square', 'square(7) returns 49.', M, String.raw`print json_encode(\Drupal::service('bench_memo.squares')->square(7) === 49);`),
    phpCheck('memory-bin', 'After square(4), core\'s cache.memory bin holds bench_memo:square:4 with the value 16.', M, String.raw`\Drupal::service('bench_memo.squares')->square(4);
$c = \Drupal::service('cache.memory')->get('bench_memo:square:4');
print json_encode(['pass' => ($c->data ?? NULL) === 16, 'detail' => $c ? $c->data : NULL]);`),
    phpCheck('tag-invalidation', 'After square(5) the item bench_memo:square:5 is in a request-scoped memory bin, and invalidating the bench_memo cache tag removes it in the same request.', M, String.raw`$bins = array_values(array_filter(['cache.memory', 'cache.static'], fn ($b) => \Drupal::hasService($b)));
\Drupal::service('bench_memo.squares')->square(5);
$before = array_filter($bins, fn ($b) => \Drupal::service($b)->get('bench_memo:square:5') !== FALSE);
\Drupal::service('cache_tags.invalidator')->invalidateTags(['bench_memo']);
$after = array_filter($bins, fn ($b) => \Drupal::service($b)->get('bench_memo:square:5') !== FALSE);
print json_encode(['pass' => $before && !$after, 'detail' => ['before' => array_values($before), 'after' => array_values($after)]]);`),
    phpCheck('not-persistent', 'Nothing is written to the persistent default bin.', M, String.raw`\Drupal::service('bench_memo.squares')->square(6);
print json_encode(\Drupal::cache()->get('bench_memo:square:6') === FALSE);`),
    noPattern('no-static-bin', 'The module does not use the deprecated cache.static bin, the cache.backend.memory backend or \\Drupal\\Core\\Cache\\MemoryBackend.', mod(M), /cache\.static\b|cache\.backend\.memory(?!\.memory)|\\?Drupal\\Core\\Cache\\MemoryBackend\b|new\s+MemoryBackend\b/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['memory-bin', 'no-static-bin', 'no-deprecated-api']);
