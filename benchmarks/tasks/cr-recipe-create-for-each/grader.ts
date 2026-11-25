import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';

const DIR = 'recipes/bench_lang_all';
const recipe = (ctx: any) => ctx.yaml(`${DIR}/recipe.yml`) || {};
const actions = (ctx: any) => recipe(ctx).config?.actions || {};

const grader: Grader = {
  checks: [
    {
      id: 'recipe', kind: 'must', text: 'recipes/bench_lang_all/recipe.yml exists and has a name.',
      run: async (ctx) => typeof recipe(ctx).name === 'string' && recipe(ctx).name.length > 0,
    },
    {
      id: 'for-each', kind: 'must', text: 'The recipe has a node.type.* action entry using createForEach or createForEachIfNotExists for language.content_settings.node.%bundle.',
      run: async (ctx) => {
        const a = actions(ctx)['node.type.*'] || {};
        const v = a.createForEach ?? a.createForEachIfNotExists ?? {};
        return { pass: !!v['language.content_settings.node.%bundle'], detail: JSON.stringify(a).slice(0, 300) };
      },
    },
    {
      id: 'no-bundle-names', kind: 'must_not', text: 'The recipe names language.content_settings.node.article or .page explicitly.',
      run: async (ctx) => !/language\.content_settings\.node\.(article|page)\b/.test(ctx.read('recipes/bench_lang_all/recipe.yml')),
    },
    {
      id: 'applied', kind: 'must', text: 'language is enabled and language.content_settings.node.article and .page exist with language_alterable true.',
      run: async (ctx) => ctx.moduleEnabled('language') && ['article', 'page'].every((b) => ctx.config(`language.content_settings.node.${b}`)?.language_alterable === true),
    },
  ],
};

export default practice(grader, ['for-each']);
