import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';

const DIR = 'recipes/bench_nav_docs';
const recipe = (ctx: any) => ctx.yaml(`${DIR}/recipe.yml`) || {};
const actions = (ctx: any) => recipe(ctx).config?.actions || {};

const grader: Grader = {
  checks: [
    {
      id: 'recipe', kind: 'must', text: 'recipes/bench_nav_docs/recipe.yml exists and has a name.',
      run: async (ctx) => typeof recipe(ctx).name === 'string' && recipe(ctx).name.length > 0,
    },
    {
      id: 'action', kind: 'must', text: 'The recipe uses the addNavigationBlock action on navigation.block_layout.',
      run: async (ctx) => !!actions(ctx)['navigation.block_layout']?.addNavigationBlock,
    },
    {
      id: 'applied', kind: 'must', text: 'The active navigation.block_layout has a navigation_link component with uri https://www.drupal.org/docs and title "Drupal docs", and still has the Content menu block.',
      run: async (ctx) => {
        const comps: any[] = Object.values(ctx.config('navigation.block_layout')?.sections?.[0]?.components || {});
        const link = comps.find((c) => c.configuration?.id === 'navigation_link' && c.configuration?.uri === 'https://www.drupal.org/docs' && c.configuration?.title === 'Drupal docs');
        return { pass: !!link && comps.some((c) => c.configuration?.id === 'navigation_menu:content'), detail: comps.map((c) => c.configuration?.id).join(',') };
      },
    },
    {
      id: 'no-config-copy', kind: 'must_not', text: 'The recipe ships navigation.block_layout.yml in its config folder.',
      run: async (ctx) => !ctx.exists('recipes/bench_nav_docs/config/navigation.block_layout.yml'),
    },
  ],
};

export default practice(grader, ['action', 'no-config-copy']);
