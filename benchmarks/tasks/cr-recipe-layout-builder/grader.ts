import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';

const DIR = 'recipes/bench_article_layouts';
const recipe = (ctx: any) => ctx.yaml(`${DIR}/recipe.yml`) || {};
const actions = (ctx: any) => recipe(ctx).config?.actions || {};

const grader: Grader = {
  checks: [
    {
      id: 'recipe', kind: 'must', text: 'recipes/bench_article_layouts/recipe.yml exists and has a name.',
      run: async (ctx) => typeof recipe(ctx).name === 'string' && recipe(ctx).name.length > 0,
    },
    {
      id: 'actions', kind: 'must', text: 'The recipe uses enableLayoutBuilder and allowLayoutOverrides: true on core.entity_view_display.node.article.default.',
      run: async (ctx) => {
        const a = actions(ctx)['core.entity_view_display.node.article.default'] || {};
        return { pass: 'enableLayoutBuilder' in a && a.allowLayoutOverrides === true, detail: JSON.stringify(a) };
      },
    },
    {
      id: 'applied', kind: 'must', text: 'The active article default display has layout_builder enabled and allow_custom true, and the layout_builder__layout field exists on articles.',
      run: async (ctx) => {
        const t = ctx.config('core.entity_view_display.node.article.default')?.third_party_settings?.layout_builder || {};
        return { pass: t.enabled === true && t.allow_custom === true && !!ctx.config('field.field.node.article.layout_builder__layout'), detail: JSON.stringify(t).slice(0, 200) };
      },
    },
    {
      id: 'no-simple-update', kind: 'must_not', text: 'The recipe sets third_party_settings.layout_builder with simpleConfigUpdate or setProperties.',
      run: async (ctx) => !/third_party_settings\.layout_builder/.test(ctx.read('recipes/bench_article_layouts/recipe.yml')),
    },
  ],
};

export default practice(grader, ['actions', 'no-simple-update']);
