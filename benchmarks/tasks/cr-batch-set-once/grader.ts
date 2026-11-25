import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_onceb';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('one-set', 'Calling queue() three times in one request leaves exactly one batch set titled "Rebuild index".', M, String.raw`$q = \Drupal::service('bench_onceb.queuer');
$q->queue(); $q->queue(); $q->queue();
$batch = batch_get();
$titles = array_map(fn ($s) => (string) ($s['title'] ?? ''), $batch['sets'] ?? []);
print json_encode(['pass' => count($titles) === 1 && $titles[0] === 'Rebuild index', 'detail' => $titles]);`),
    phpCheck('registered-id', 'After queue(), core reports the set ID bench_onceb_rebuild as registered.', M, String.raw`\Drupal::service('bench_onceb.queuer')->queue();
print json_encode(\Drupal\Core\Batch\BatchBuilder::isSetIdRegistered('bench_onceb_rebuild'));`),
    noPattern('no-own-flag', 'The module does not track "already queued" in a static variable or state of its own.', mod(M), /\bstatic\s+\$|->set\(\s*['"]bench_onceb|drupal_static\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['registered-id', 'no-own-flag', 'no-deprecated-api']);
