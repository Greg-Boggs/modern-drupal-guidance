import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { phpCheck } from '../_cr/lib.ts';

const grader: Grader = {
  checks: [
    {
      id: 'setting', kind: 'must', text: 'node.settings use_admin_theme is false.',
      run: async (ctx) => ({ pass: ctx.config('node.settings')?.use_admin_theme === false, detail: JSON.stringify(ctx.config('node.settings')) }),
    },
    phpCheck('route-not-admin', 'The node.add route is no longer treated as an admin route by the admin context.', null, String.raw`\Drupal::service('router.builder')->rebuild();
$route = \Drupal::service('router.route_provider')->getRouteByName('node.add');
print json_encode(!\Drupal::service('router.admin_context')->isAdminRoute($route));`),
    {
      id: 'admin-theme-kept', kind: 'must_not', text: 'system.theme admin was changed from claro.',
      run: async (ctx) => ctx.config('system.theme')?.admin === 'claro',
    },
  ],
};

export default grader;
