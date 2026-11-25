import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_setter';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'page', kind: 'must', text: 'GET /bench-time returns 200 with "Request time: " followed by a timestamp.',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = await ctx.http('/bench-time');
        return { pass: r.status === 200 && /Request time: \d{10}/.test(r.body), detail: `status ${r.status}` };
      },
    },
    phpCheck('no-constructor', 'The controller behind /bench-time declares neither __construct() nor create() and gets the time service through a setter with the #[Required] attribute.', M, String.raw`$routes = iterator_to_array(\Drupal::service('router.route_provider')->getRoutesByPattern('/bench-time'));
$r = reset($routes);
[$class] = explode('::', ltrim($r->getDefault('_controller'), '\\'));
$rc = new \ReflectionClass($class);
$own = fn ($m) => $rc->hasMethod($m) && $rc->getMethod($m)->getDeclaringClass()->getName() === $rc->getName();
$req = array_filter($rc->getMethods(), fn ($m) => $m->getAttributes('Symfony\Contracts\Service\Attribute\Required'));
print json_encode(['pass' => !$own('__construct') && !$own('create') && (bool) $req, 'detail' => [$class, $own('__construct'), $own('create'), count($req)]]);`),
    noPattern('no-static', 'The module calls \\Drupal::.', mod(M), /\\Drupal::/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-constructor', 'no-static', 'no-deprecated-api']);
