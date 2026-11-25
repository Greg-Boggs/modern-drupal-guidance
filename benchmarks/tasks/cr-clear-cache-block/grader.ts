import type { Grader, GradeContext } from '../../../engine/src/grading/drupal/context.ts';
import { noPattern } from '../_cr/lib.ts';

function placements(ctx: GradeContext) {
  return ctx.configNames('block.block.').map((n) => ctx.config(n)).filter((c: any) => c.plugin === 'system_clear_cache_block');
}

const grader: Grader = {
  checks: [
    {
      id: 'placed', kind: 'must', text: 'A block using core\'s clear cache block plugin (system_clear_cache_block) is enabled in Claro\'s content region.',
      run: async (ctx) => {
        const p = placements(ctx);
        return { pass: p.some((c: any) => c.theme === 'claro' && c.region === 'content' && c.status === true), detail: JSON.stringify(p.map((c: any) => [c.theme, c.region, c.status])) };
      },
    },
    {
      id: 'renders', kind: 'must', text: 'Rendering the placed block for user 1 produces a form with a button.',
      run: async (ctx) => {
        const r = ctx.phpEval(String.raw`\Drupal::service('account_switcher')->switchTo(\Drupal\user\Entity\User::load(1));
$ids = \Drupal::entityQuery('block')->accessCheck(FALSE)->condition('plugin', 'system_clear_cache_block')->condition('theme', 'claro')->execute();
if (!$ids) { print 'none'; return; }
$b = \Drupal\block\Entity\Block::load(reset($ids));
$build = $b->getPlugin()->build();
print (string) \Drupal::service('renderer')->renderInIsolation($build);`);
        return { pass: /<form/.test(r.out) && /type="submit"/.test(r.out), detail: r.out.slice(0, 200) };
      },
    },
    noPattern('no-custom-module', 'No custom module or theme code was written for it.', 'web/modules/custom', /[\s\S]+/, /\.(php|module|yml)$/),
  ],
};

export default grader;
