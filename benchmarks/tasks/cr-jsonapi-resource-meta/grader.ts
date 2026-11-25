import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, php, practice } from '../_cr/lib.ts';

const M = 'bench_apimeta';

async function meta(ctx: any, uuid: string) {
  const r = await ctx.http(`/jsonapi/node/article/${uuid}`);
  try {
    return { status: r.status, meta: JSON.parse(r.body)?.data?.meta ?? null };
  } catch {
    return { status: r.status, meta: null };
  }
}

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'jsonapi-enabled', kind: 'must', text: 'The jsonapi module is enabled.',
      run: async (ctx) => ctx.moduleEnabled('jsonapi'),
    },
    {
      id: 'meta', kind: 'must', text: 'GET /jsonapi/node/article/<uuid> for an article titled "Hello JSON" has data.meta.bench_title_length = 10.',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M) || !ctx.moduleEnabled('jsonapi')) return false;
        const uuid = php(ctx, String.raw`$n = \Drupal\node\Entity\Node::create(['type' => 'article', 'title' => 'Hello JSON', 'status' => 1]); $n->save(); print json_encode($n->uuid());`);
        const m = await meta(ctx, uuid);
        return { pass: m.meta?.bench_title_length === 10, detail: JSON.stringify(m) };
      },
    },
    {
      id: 'meta-updates', kind: 'must', text: 'After the title changes to "Hi" the cached response reports 2.',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M) || !ctx.moduleEnabled('jsonapi')) return false;
        const uuid = php(ctx, String.raw`$n = \Drupal\node\Entity\Node::create(['type' => 'article', 'title' => 'Before change', 'status' => 1]); $n->save(); print json_encode($n->uuid());`);
        await meta(ctx, uuid);
        php(ctx, String.raw`$n = \Drupal::service('entity.repository')->loadEntityByUuid('node', '${uuid}'); $n->setTitle('Hi')->save(); print json_encode(TRUE);`);
        const m = await meta(ctx, uuid);
        return { pass: m.meta?.bench_title_length === 2, detail: JSON.stringify(m) };
      },
    },
    noPattern('no-override', 'The module does not decorate or replace JSON:API normalizers or serializer services.', mod(M), /decorates:\s*['"]?(jsonapi|serializer)|serializer\.normalizer\.[\w.]*jsonapi|class:\s*['"]?Drupal\\jsonapi\\/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-override', 'no-deprecated-api']);
