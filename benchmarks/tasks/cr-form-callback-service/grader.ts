import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_feedback';
const FORM = String.raw`$routes = iterator_to_array(\Drupal::service('router.route_provider')->getRoutesByPattern('/feedback'));
$class = reset($routes)->getDefault('_form');
$fs = new \Drupal\Core\Form\FormState();
$form = \Drupal::formBuilder()->buildForm($class, $fs);
$handlers = array_merge($form['#submit'] ?? [], $form['actions']['submit']['#submit'] ?? [], $form['submit']['#submit'] ?? []);
$svc = \Drupal::service('bench_feedback.recorder');
$isSvc = function ($h) use ($svc) { if (is_string($h) && str_contains($h, ':') && !str_contains($h, '::')) { $c = \Drupal::service('callable_resolver')->getCallableFromDefinition($h); return is_array($c) && $c[0] === $svc && $c[1] === 'record'; } return FALSE; };`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('service-injection', 'bench_feedback.recorder exists and its record() method is public and not static.', M, String.raw`$r = new \ReflectionMethod(\Drupal::service('bench_feedback.recorder'), 'record');
print json_encode($r->isPublic() && !$r->isStatic());`),
    phpCheck('handler-is-service', 'The form\'s submit handlers include a "service:method" string that resolves to record() on the bench_feedback.recorder service.', M, FORM + String.raw`
print json_encode(['pass' => (bool) array_filter($handlers, $isSvc), 'detail' => array_map(fn ($h) => is_string($h) ? $h : gettype($h), $handlers)]);`),
    phpCheck('submit-saves', 'Submitting the form programmatically with message "Great site" stores it in state bench_feedback.last.', M, String.raw`\Drupal::state()->delete('bench_feedback.last');
$routes = iterator_to_array(\Drupal::service('router.route_provider')->getRoutesByPattern('/feedback'));
$class = reset($routes)->getDefault('_form');
$fs = (new \Drupal\Core\Form\FormState())->setValues(['message' => 'Great site']);
\Drupal::formBuilder()->submitForm($class, $fs);
print json_encode(['pass' => \Drupal::state()->get('bench_feedback.last') === 'Great site', 'detail' => [\Drupal::state()->get('bench_feedback.last'), array_map('strval', $fs->getErrors())]]);`),
    noPattern('no-this-callback', 'The module does not register [$this, ...] or a closure as a form callback.', mod(M), /\[\s*\$this\s*,|#submit['"]\]\s*\[\]\s*=\s*(static\s+)?function|#submit['"]\]\s*\[\]\s*=\s*fn\b/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['handler-is-service', 'no-this-callback', 'no-deprecated-api']);
