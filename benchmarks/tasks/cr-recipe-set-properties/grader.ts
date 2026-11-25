import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';

const DIR = 'recipes/bench_story';
const recipe = (ctx: any) => ctx.yaml(`${DIR}/recipe.yml`) || {};
const actions = (ctx: any) => recipe(ctx).config?.actions || {};

const grader: Grader = {
  checks: [
    {
      id: 'recipe', kind: 'must', text: 'recipes/bench_story/recipe.yml exists and has a name.',
      run: async (ctx) => typeof recipe(ctx).name === 'string' && recipe(ctx).name.length > 0,
    },
    {
      id: 'set-properties', kind: 'must', text: 'The recipe uses setProperties on node.type.article.',
      run: async (ctx) => !!actions(ctx)['node.type.article']?.setProperties,
    },
    {
      id: 'no-simple-config', kind: 'must_not', text: 'The recipe uses simpleConfigUpdate on node.type.article.',
      run: async (ctx) => !actions(ctx)['node.type.article']?.simpleConfigUpdate,
    },
    {
      id: 'applied', kind: 'must', text: 'node.type.article has name "Story" and description "Short stories from our writers."',
      run: async (ctx) => ctx.config('node.type.article')?.name === 'Story' && ctx.config('node.type.article')?.description === 'Short stories from our writers.',
    },
  ],
};

export default practice(grader, ['set-properties', 'no-simple-config']);
