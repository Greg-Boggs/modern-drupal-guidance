import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_attr';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'page', kind: 'must', text: 'GET /bench-hello returns 200 with "Hello from a controller."',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = await ctx.http('/bench-hello');
        return { pass: r.status === 200 && /Hello from a controller\./.test(r.body), detail: `status ${r.status}` };
      },
    },
    phpCheck('route-name', 'The route bench_attr.hello exists with path /bench-hello and title Hello.', M, String.raw`$r = \Drupal::service('router.route_provider')->getRouteByName('bench_attr.hello');
print json_encode(['pass' => $r->getPath() === '/bench-hello' && (string) $r->getDefault('_title') === 'Hello', 'detail' => $r->getPath()]);`),
    {
      id: 'no-routing-yml', kind: 'must_not', text: 'web/modules/custom/bench_attr/bench_attr.routing.yml exists.',
      run: async (ctx) => !ctx.exists(`${mod(M)}/${M}.routing.yml`),
    },
    noPattern('no-route-subscriber', 'The module has a route subscriber.', mod(M), /RouteSubscriberBase|alterRoutes\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-routing-yml', 'no-route-subscriber', 'no-deprecated-api']);
