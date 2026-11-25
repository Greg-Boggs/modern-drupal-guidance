import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';

const DIR = 'recipes/bench_about';

function exported(ctx: any) {
  for (const f of ctx.files(`${DIR}/content`, '**/*.yml')) {
    const y = ctx.yaml(f);
    if (y?._meta?.entity_type === 'node' && JSON.stringify(y?.default?.title || '').includes('About us')) return { f, y };
  }
  return null;
}

const grader: Grader = {
  checks: [
    {
      id: 'recipe', kind: 'must', text: 'recipes/bench_about/recipe.yml exists and is named "Bench about".',
      run: async (ctx) => ctx.yaml(`${DIR}/recipe.yml`)?.name === 'Bench about',
    },
    {
      id: 'exported', kind: 'must', text: 'recipes/bench_about/content/ holds a YAML file in core\'s default content format (_meta with entity_type node, bundle page and a uuid) for "About us".',
      run: async (ctx) => {
        const e = exported(ctx);
        return { pass: !!e && e.y._meta.bundle === 'page' && typeof e.y._meta.uuid === 'string', detail: e ? e.f : ctx.files(`${DIR}/content`).join(',') };
      },
    },
    {
      id: 'filename-uuid', kind: 'must', text: 'The file is in content/node/ and named after the node\'s UUID, as core\'s content exporter writes it.',
      run: async (ctx) => {
        const e = exported(ctx);
        return { pass: !!e && e.f.endsWith(`/content/node/${e.y._meta.uuid}.yml`), detail: e?.f };
      },
    },
    {
      id: 'body', kind: 'must', text: 'The exported body contains "We build websites."',
      run: async (ctx) => JSON.stringify(exported(ctx)?.y?.default?.body || '').includes('We build websites.'),
    },
  ],
};

export default practice(grader, ['filename-uuid']);
