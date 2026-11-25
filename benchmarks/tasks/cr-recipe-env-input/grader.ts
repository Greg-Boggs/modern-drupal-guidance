import type { Grader } from '../../../engine/src/grading/drupal/context.ts';

const DIR = 'recipes/bench_slogan';
const recipe = (ctx: any) => ctx.yaml(`${DIR}/recipe.yml`) || {};
const actions = (ctx: any) => recipe(ctx).config?.actions || {};

const grader: Grader = {
  checks: [
    {
      id: 'recipe', kind: 'must', text: 'recipes/bench_slogan/recipe.yml exists and has a name.',
      run: async (ctx) => typeof recipe(ctx).name === 'string' && recipe(ctx).name.length > 0,
    },
    {
      id: 'env-input', kind: 'must', text: 'The slogan input defaults to source env with env BENCH_SLOGAN and fallback "Made with Drupal".',
      run: async (ctx) => {
        const d = recipe(ctx).input?.slogan?.default || {};
        return { pass: d.source === 'env' && d.env === 'BENCH_SLOGAN' && d.fallback === 'Made with Drupal', detail: JSON.stringify(d) };
      },
    },
    {
      id: 'applied', kind: 'must', text: 'The active site slogan is "Built with recipes".',
      run: async (ctx) => ({ pass: ctx.config('system.site')?.slogan === 'Built with recipes', detail: JSON.stringify(ctx.config('system.site')?.slogan) }),
    },
  ],
};

export default grader;
