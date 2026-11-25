import type { Grader, GradeContext } from '../../../engine/src/grading/drupal/context.ts';

/** Effective option for a display: its own override, else the default display's. */
function opt(view: any, displayId: string, key: string): any {
  const d = view?.display?.[displayId]?.display_options || {};
  return d[key] !== undefined ? d[key] : view?.display?.default?.display_options?.[key];
}

function displays(view: any, plugin: string): string[] {
  return Object.entries(view?.display || {}).filter(([, d]: any) => d.display_plugin === plugin).map(([id]) => id);
}

/** The display the checks judge: the page display if there is one, else the default. */
function mainDisplay(view: any): string {
  return displays(view, 'page')[0] || 'default';
}

function view(ctx: GradeContext) {
  return ctx.config('views.view.recent_articles');
}

const grader: Grader = {
  checks: [
    {
      id: 'view-exists', kind: 'must', text: 'View recent_articles exists, is enabled and lists content.',
      run: async (ctx) => view(ctx)?.status === true && view(ctx)?.base_table === 'node_field_data',
    },
    {
      id: 'filters', kind: 'must', text: 'The view filters on the article type and on published status.',
      run: async (ctx) => {
        const v = view(ctx);
        const filters = Object.values(opt(v, mainDisplay(v), 'filters') || {}) as any[];
        const type = filters.some((f) => (f.field === 'type' || f.plugin_id === 'bundle') && f.value && Object.keys(f.value).includes('article'));
        const status = filters.some((f) => (f.field === 'status' && String(f.value) === '1') || f.plugin_id === 'node_status' || f.field === 'status_extra');
        return { pass: type && status, detail: `type=${type} status=${status}` };
      },
    },
    {
      id: 'sort', kind: 'must', text: 'The view sorts by created date, newest first.',
      run: async (ctx) => {
        const v = view(ctx);
        const sorts = Object.values(opt(v, mainDisplay(v), 'sorts') || {}) as any[];
        return sorts.length > 0 && sorts[0].field === 'created' && sorts[0].order === 'DESC';
      },
    },
    {
      id: 'pager', kind: 'must', text: 'The view shows 5 items.',
      run: async (ctx) => {
        const v = view(ctx);
        const pager = opt(v, mainDisplay(v), 'pager');
        return { pass: Number(pager?.options?.items_per_page) === 5, detail: `items_per_page=${pager?.options?.items_per_page}` };
      },
    },
    {
      id: 'page-display', kind: 'must', text: 'A page display exists at /recent-articles.',
      run: async (ctx) => {
        const v = view(ctx);
        return displays(v, 'page').some((id) => String(v.display[id].display_options?.path).replace(/^\//, '') === 'recent-articles');
      },
    },
    {
      id: 'block-display', kind: 'must', text: 'A block display exists.',
      run: async (ctx) => displays(view(ctx), 'block').length > 0,
    },
    {
      id: 'renders', kind: 'must', text: '/recent-articles lists the five newest published articles, newest first, as links.',
      run: async (ctx) => {
        const base = 1_800_000_000;
        for (let i = 1; i <= 6; i++) ctx.createNode('article', `Bench article ${i}`, `'created' => ${base + i * 60}`);
        ctx.createNode('article', 'Bench draft article', `'created' => ${base + 1000}, 'status' => 0`);
        ctx.createNode('page', 'Bench basic page', `'created' => ${base + 2000}`);
        const res = await ctx.http('/recent-articles');
        const b = res.body;
        const linked = (t: string) => new RegExp(`<a [^>]*href="[^"]*"[^>]*>\\s*${t}\\s*</a>`).test(b);
        const shown = [6, 5, 4, 3, 2].every((i) => linked(`Bench article ${i}`));
        const order = b.indexOf('Bench article 6') < b.indexOf('Bench article 2');
        const hidden = !b.includes('Bench article 1<') && !b.includes('Bench article 1\n') && !linked('Bench article 1') && !b.includes('Bench draft article') && !b.includes('Bench basic page');
        return { pass: res.status === 200 && shown && order && hidden, detail: `HTTP ${res.status} shown=${shown} order=${order} hidden=${hidden}` };
      },
    },
    {
      id: 'block-not-placed', kind: 'must_not', text: 'The view block is not placed in any region.',
      run: async (ctx) => {
        const placed = ctx.configNames('block.block.').filter((n) => String(ctx.config(n)?.plugin).startsWith('views_block:recent_articles-'));
        return { pass: placed.length === 0, detail: placed.join(', ') || undefined };
      },
    },
  ],
};

export default grader;
