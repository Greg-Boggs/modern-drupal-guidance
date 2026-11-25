import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_lazy';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('closure-arg', 'The service object holds a closure that returns the entity type manager.', M, String.raw`$o = \Drupal::service('bench_lazy.counter');
$found = NULL;
foreach ((new \ReflectionObject($o))->getProperties() as $p) { $p->setAccessible(TRUE); $v = $p->isInitialized($o) ? $p->getValue($o) : NULL; if ($v instanceof \Closure) { $found = $v; } }
print json_encode(['pass' => $found !== NULL && $found() instanceof \Drupal\Core\Entity\EntityTypeManagerInterface, 'detail' => $found ? 'closure' : 'no closure property']);`),
    phpCheck('count', 'nodeCount() returns the number of nodes (2 after creating two).', M, String.raw`$s = \Drupal::entityTypeManager()->getStorage('node');
foreach ($s->loadMultiple() as $n) { $n->delete(); }
$s->create(['type' => 'page', 'title' => 'x'])->save(); $s->create(['type' => 'page', 'title' => 'y'])->save();
print json_encode(\Drupal::service('bench_lazy.counter')->nodeCount() === 2);`),
    noPattern('no-long-syntax', 'bench_lazy.services.yml uses the long !service_closure tag.', mod(M), /!service_closure/, /\.ya?ml$/),
    noPattern('no-static-container', 'The module calls \\Drupal:: or receives the service container.', mod(M), /\\Drupal::|['"]@service_container['"]/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-long-syntax', 'no-static-container', 'no-deprecated-api']);
