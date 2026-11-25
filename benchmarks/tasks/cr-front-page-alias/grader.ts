import type { Grader } from '../../../engine/src/grading/drupal/context.ts';

const grader: Grader = {
  checks: [
    {
      id: 'config-alias', kind: 'must', text: 'system.site page.front is "/welcome".',
      run: async (ctx) => ({ pass: ctx.config('system.site')?.page?.front === '/welcome', detail: JSON.stringify(ctx.config('system.site')?.page) }),
    },
    {
      id: 'node', kind: 'must', text: 'A published Basic page "Welcome" exists.',
      run: async (ctx) => (ctx.content().node || []).some((n: any) => n.title === 'Welcome' && n.type === 'page' && (n.status === true || n.status === 1 || n.status === '1')),
    },
    {
      id: 'front-renders', kind: 'must', regrade: 'recorded', text: 'GET / returns 200 with "Hello from the welcome page." and no redirect to /welcome.',
      run: async (ctx) => {
        const r = await fetch(`${(await ctx.http('/robots.txt'), ctx.baseUrl())}/`, { redirect: 'manual' });
        const body = await r.text();
        return { pass: r.status === 200 && body.includes('Hello from the welcome page.'), detail: `status ${r.status} ${r.headers.get('location') || ''}` };
      },
    },
  ],
};

export default grader;
