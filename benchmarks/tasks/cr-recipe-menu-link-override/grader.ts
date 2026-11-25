import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { phpCheck, practice } from '../_cr/lib.ts';

const DIR = 'recipes/bench_no_myaccount';
const recipe = (ctx: any) => ctx.yaml(`${DIR}/recipe.yml`) || {};
const actions = (ctx: any) => recipe(ctx).config?.actions || {};

const grader: Grader = {
  checks: [
    {
      id: 'recipe', kind: 'must', text: 'recipes/bench_no_myaccount/recipe.yml exists and has a name.',
      run: async (ctx) => typeof recipe(ctx).name === 'string' && recipe(ctx).name.length > 0,
    },
    {
      id: 'action', kind: 'must', text: 'The recipe uses overrideMenuLinks on core.menu.static_menu_link_overrides for user.page.',
      run: async (ctx) => !!actions(ctx)['core.menu.static_menu_link_overrides']?.overrideMenuLinks?.['user.page'],
    },
    phpCheck('applied', 'The menu link manager reports user.page disabled and user.logout at weight 50.', null, String.raw`$m = \Drupal::service('plugin.manager.menu.link');
$p = $m->getDefinition('user.page'); $l = $m->getDefinition('user.logout');
print json_encode(['pass' => empty($p['enabled']) && (int) $l['weight'] === 50, 'detail' => [$p['enabled'], $l['weight']]]);`),
    {
      id: 'no-config-copy', kind: 'must_not', text: 'The recipe ships core.menu.static_menu_link_overrides.yml in its config folder.',
      run: async (ctx) => !ctx.exists('recipes/bench_no_myaccount/config/core.menu.static_menu_link_overrides.yml'),
    },
  ],
};

export default practice(grader, ['action', 'no-config-copy']);
