import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, practice } from '../_cr/lib.ts';

const M = 'bench_banner';
const NOTICE = 'Site-wide notice: maintenance tonight.';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'page-top', kind: 'must', text: 'GET /bench-banner shows the notice before the theme\'s page markup (its first <header> element) and before the main content.',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = await ctx.http('/bench-banner');
        const n = r.body.indexOf(NOTICE);
        const canvas = r.body.search(/<header[\s>]/);
        const main = r.body.indexOf('Main content here.');
        return { pass: r.status === 200 && n > -1 && canvas > -1 && n < canvas && main > canvas, detail: `status=${r.status} notice=${n} canvas=${canvas} main=${main}` };
      },
    },
    {
      id: 'only-there', kind: 'must', text: 'GET /user/login does not show the notice.',
      run: async (ctx) => ctx.moduleEnabled(M) && !(await ctx.http('/user/login')).body.includes(NOTICE),
    },
    noPattern('no-page-hooks', 'The module implements no page_top, page_bottom or page_attachments hook.', mod(M), /#\[Hook\(\s*['"]page_(top|bottom|attachments(_alter)?)['"]|function\s+bench_banner_page_(top|bottom|attachments)/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-page-hooks', 'no-deprecated-api']);
