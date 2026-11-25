import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_shop';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'page', kind: 'must', text: 'GET /bench-shop returns 200 with "Welcome to the shop."',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = await ctx.http('/bench-shop');
        return { pass: r.status === 200 && /Welcome to the shop\./.test(r.body), detail: `status ${r.status}` };
      },
    },
    phpCheck('old-name-resolves', 'Url::fromRoute(\'bench_shop.list\') generates /bench-shop.', M, String.raw`print json_encode(\Drupal\Core\Url::fromRoute('bench_shop.list')->toString() === '/bench-shop');`),
    {
      id: 'alias-deprecated', kind: 'must', text: 'bench_shop.routing.yml declares bench_shop.list with alias bench_shop.catalog and a deprecated entry with package, version and message.',
      run: async (ctx) => {
        const y = ctx.yaml(`${mod(M)}/${M}.routing.yml`) || {};
        const e = y['bench_shop.list'] || {};
        return { pass: e.alias === 'bench_shop.catalog' && !!e.deprecated?.package && !!e.deprecated?.version && !!e.deprecated?.message && !e.path, detail: JSON.stringify(e) };
      },
    },
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-deprecated-api']);
