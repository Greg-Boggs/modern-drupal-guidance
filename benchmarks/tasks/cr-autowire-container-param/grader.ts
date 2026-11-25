import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_param';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'page', kind: 'must', text: 'GET /bench-site-path shows "Site path: sites/default".',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = await ctx.http('/bench-site-path');
        return { pass: r.status === 200 && r.body.includes('Site path: sites/default'), detail: `status ${r.status}` };
      },
    },
    phpCheck('no-create', 'The controller behind /bench-site-path does not declare create(), so core autowires its constructor.', M, String.raw`$routes = iterator_to_array(\Drupal::service('router.route_provider')->getRoutesByPattern('/bench-site-path'));
$r = reset($routes);
[$class] = explode('::', ltrim($r->getDefault('_controller'), '\\'));
$m = new \ReflectionMethod($class, 'create');
print json_encode(['pass' => $m->getDeclaringClass()->getName() !== ltrim($class, '\\'), 'detail' => $m->getDeclaringClass()->getName()]);`),
    noPattern('no-static', 'The module calls \\Drupal::, reads the container, or reads Settings.', mod(M), /\\Drupal::|getContainer\s*\(|getParameter\s*\(|Settings::/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-create', 'no-static', 'no-deprecated-api']);
