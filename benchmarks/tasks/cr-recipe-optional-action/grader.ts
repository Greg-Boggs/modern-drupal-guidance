import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';

const DIR = 'recipes/bench_quiet_footer';
const recipe = (ctx: any) => ctx.yaml(`${DIR}/recipe.yml`) || {};
const actions = (ctx: any) => recipe(ctx).config?.actions || {};

const grader: Grader = {
  checks: [
    {
      id: 'recipe', kind: 'must', text: 'recipes/bench_quiet_footer/recipe.yml exists and has a name.',
      run: async (ctx) => typeof recipe(ctx).name === 'string' && recipe(ctx).name.length > 0,
    },
    {
      id: 'optional-key', kind: 'must', text: 'The recipe has an action entry for ?block.block.bench_promo (skip if missing).',
      run: async (ctx) => !!actions(ctx)['?block.block.bench_promo'],
    },
    {
      id: 'applied', kind: 'must', text: 'block.block.olivero_powered is disabled and no bench_promo block was created.',
      run: async (ctx) => ctx.config('block.block.olivero_powered')?.status === false && !ctx.config('block.block.bench_promo'),
    },
  ],
};

export default practice(grader, ['optional-key']);
