import type { Grader, GradeContext } from '../../../engine/src/grading/drupal/context.ts';

const BODY = 'Open Monday to Friday, 9:00 to 17:00';

function blockContent(ctx: GradeContext) {
  return (ctx.content().block_content || []).find((b: any) => b.info === 'Office hours' && b.type === 'basic' && String(b.body).includes(BODY));
}

function placements(ctx: GradeContext, theme?: string) {
  const b = blockContent(ctx);
  return ctx.configNames('block.block.').map((n) => ctx.config(n))
    .filter((c: any) => (b ? c.plugin === `block_content:${b.uuid}` : String(c.plugin).startsWith('block_content:'))
      && (!theme || c.theme === theme));
}

function placement(ctx: GradeContext) {
  return placements(ctx, 'olivero').find((c: any) => c.region === 'footer_top' && c.status === true);
}

const grader: Grader = {
  checks: [
    {
      id: 'block-content', kind: 'must', text: 'A basic custom block "Office hours" with the opening hours in its body exists.',
      run: async (ctx) => !!blockContent(ctx),
    },
    {
      id: 'placed', kind: 'must', text: 'The block is placed and enabled in Olivero\'s footer_top region.',
      run: async (ctx) => !!blockContent(ctx) && !!placement(ctx),
    },
    {
      id: 'title-visible', kind: 'must', text: 'The placed block displays its title.',
      run: async (ctx) => placement(ctx)?.settings?.label_display === 'visible',
    },
    {
      id: 'all-pages', kind: 'must', text: 'The placed block has no visibility conditions.',
      run: async (ctx) => {
        const p = placement(ctx);
        return !!p && Object.keys(p.visibility || {}).length === 0;
      },
    },
    {
      id: 'renders', kind: 'must', regrade: 'recorded', text: 'The front page and /user/login show the opening hours.',
      run: async (ctx) => {
        const front = await ctx.http('/');
        const login = await ctx.http('/user/login');
        return { pass: front.body.includes(BODY) && login.body.includes(BODY), detail: `front=${front.status} login=${login.status}` };
      },
    },
    {
      id: 'not-in-admin-theme', kind: 'must_not', text: 'The block is not placed in the Claro admin theme.',
      run: async (ctx) => !blockContent(ctx) || placements(ctx, 'claro').length === 0,
    },
  ],
};

export default grader;
