import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_batch';
const SVC = String.raw`$b = \Drupal::service('bench_batch.counter')->buildBatch();
$svc = \Drupal::service('bench_batch.counter');
$res = function ($h) use ($svc) { return is_string($h) && str_contains($h, ':') && !str_contains($h, '::') && ($c = \Drupal::service('callable_resolver')->getCallableFromDefinition($h)) && is_array($c) && $c[0] === $svc; };`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('ops-are-service-callables', 'Every operation callback is a "service:method" string that resolves to the bench_batch.counter service.', M, SVC + String.raw`
$ops = array_column($b['operations'] ?? [], 0);
print json_encode(['pass' => count($ops) === 3 && count(array_filter($ops, $res)) === 3, 'detail' => array_map(fn ($o) => is_string($o) ? $o : gettype($o), $ops)]);`),
    phpCheck('finished-is-service-callable', 'The finished callback is a "service:method" string that resolves to the bench_batch.counter service.', M, SVC + String.raw`
print json_encode(['pass' => $res($b['finished'] ?? NULL), 'detail' => is_string($b['finished'] ?? NULL) ? $b['finished'] : gettype($b['finished'] ?? NULL)]);`),
    phpCheck('runs', 'Processing the batch non-progressively leaves bench_batch.count at 3 and bench_batch.done TRUE.', M, String.raw`\Drupal::state()->delete('bench_batch.count'); \Drupal::state()->delete('bench_batch.done');
batch_set(\Drupal::service('bench_batch.counter')->buildBatch());
$batch =& batch_get(); $batch['progressive'] = FALSE;
$req = \Symfony\Component\HttpFoundation\Request::create('/');
$req->attributes->set('_route', '<front>');
$req->attributes->set('_route_object', \Drupal::service('router.route_provider')->getRouteByName('<front>'));
\Drupal::requestStack()->push($req);
batch_process();
print json_encode(['pass' => \Drupal::state()->get('bench_batch.count') === 3 && \Drupal::state()->get('bench_batch.done') === TRUE, 'detail' => [\Drupal::state()->get('bench_batch.count'), \Drupal::state()->get('bench_batch.done')]]);`),
    noPattern('no-object-callbacks', 'The module does not pass [$this, ...] arrays or closures as batch callbacks.', mod(M), /\[\s*\$this\s*,|addOperation\(\s*(static\s+)?(function|fn)\b|setFinishCallback\(\s*(static\s+)?(function|fn)\b/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['ops-are-service-callables', 'finished-is-service-callable', 'no-object-callbacks', 'no-deprecated-api']);
