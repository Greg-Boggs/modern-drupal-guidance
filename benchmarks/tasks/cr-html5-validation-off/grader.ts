import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { noPattern, php } from '../_cr/lib.ts';

const grader: Grader = {
  checks: [
    {
      id: 'setting', kind: 'must', text: 'Settings::get(\'enable_html5_validation\') is FALSE.',
      run: async (ctx) => {
        const v = php(ctx, String.raw`print json_encode(\Drupal\Core\Site\Settings::get('enable_html5_validation', 'unset'));`);
        return { pass: v === false, detail: JSON.stringify(v) };
      },
    },
    {
      id: 'novalidate', kind: 'must', text: 'The user login form at /user/login is rendered with the novalidate attribute and its username field keeps required.',
      run: async (ctx) => {
        const r = await ctx.http('/user/login');
        const form = (r.body.match(/<form[^>]*id="user-login-form"[^>]*>/) || [''])[0];
        return { pass: /\snovalidate\b/.test(form) && /name="name"[^>]*required|required[^>]*name="name"/.test(r.body), detail: form.slice(0, 200) };
      },
    },
    noPattern('no-custom-code', 'No custom module code was written for it.', 'web/modules/custom', /[\s\S]+/, /\.(php|module|yml)$/),
  ],
};

export default grader;
