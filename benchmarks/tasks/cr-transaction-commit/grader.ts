import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { hasPattern, mod, moduleEnabled, noDeprecatedApis, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_tx';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('writes', 'writePair(\'x\', \'y\') stores a => x and b => y in the bench_tx key-value collection.', M, String.raw`\Drupal::keyValue('bench_tx')->deleteAll();
\Drupal::service('bench_tx.writer')->writePair('x', 'y');
print json_encode(['pass' => \Drupal::keyValue('bench_tx')->getMultiple(['a', 'b']) === ['a' => 'x', 'b' => 'y'], 'detail' => \Drupal::keyValue('bench_tx')->getAll()]);`),
    phpCheck('no-open-transaction', 'After writePair() returns, no transaction is left open on the connection.', M, String.raw`\Drupal::keyValue('bench_tx')->deleteAll();
\Drupal::service('bench_tx.writer')->writePair('p', 'q');
print json_encode(!\Drupal::database()->inTransaction());`),
    hasPattern('explicit-commit', 'The module calls commitOrRelease() on its transaction.', mod(M), /->commitOrRelease\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['explicit-commit', 'no-deprecated-api']);
