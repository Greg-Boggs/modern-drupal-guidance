import type { Grader, GradeContext } from '../../../engine/src/grading/drupal/context.ts';

function pages(ctx: GradeContext) {
  return (ctx.content().node || []).filter((n: any) => n.type === 'page' && n.title === 'About us' && n.status === 1);
}

function aboutLinks(ctx: GradeContext) {
  return (ctx.content().menu_link_content || []).filter((l: any) => l.title === 'About us');
}

const grader: Grader = {
  checks: [
    {
      id: 'page', kind: 'must', text: 'Exactly one published basic page is titled About us.',
      run: async (ctx) => pages(ctx).length === 1,
    },
    {
      id: 'alias', kind: 'must', text: 'The About us page has the alias /about.',
      run: async (ctx) => pages(ctx).length === 1 && pages(ctx)[0].alias === '/about',
    },
    {
      id: 'menu-link', kind: 'must', text: 'An enabled main menu link titled About us points to the page.',
      run: async (ctx) => {
        const p = pages(ctx)[0];
        if (!p) return false;
        const targets = [`entity:node/${p.id}`, `internal:/node/${p.id}`, 'internal:/about'];
        return aboutLinks(ctx).some((l: any) => l.menu === 'main' && l.enabled === 1 && targets.includes(l.uri));
      },
    },
    {
      id: 'renders', kind: 'must', regrade: 'recorded', text: 'The front page links to /about with the text About us.',
      run: async (ctx) => {
        const res = await ctx.http('/');
        return { pass: /<a [^>]*href="\/about"[^>]*>\s*(<[^>]+>\s*)*About us/.test(res.body), detail: `HTTP ${res.status}` };
      },
    },
    {
      id: 'no-other-menus', kind: 'must_not', text: 'No About us link exists in another menu.',
      run: async (ctx) => aboutLinks(ctx).every((l: any) => l.menu === 'main'),
    },
  ],
};

export default grader;
