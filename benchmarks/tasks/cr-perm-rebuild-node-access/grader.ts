import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { phpCheck } from '../_cr/lib.ts';

const grader: Grader = {
  checks: [
    {
      id: 'role', kind: 'must', text: 'The role site_manager exists with the label "Site manager".',
      run: async (ctx) => ctx.config('user.role.site_manager')?.label === 'Site manager',
    },
    phpCheck('route-access', 'A user with only the site_manager role passes access for the node.configure_rebuild_confirm route.', null, String.raw`if (!\Drupal\user\Entity\Role::load('site_manager')) { print json_encode(FALSE); return; }
$u = \Drupal\user\Entity\User::create(['name' => 'sm' . rand(), 'status' => 1, 'roles' => ['site_manager']]); $u->save();
print json_encode(\Drupal\Core\Url::fromRoute('node.configure_rebuild_confirm')->access($u));`),
    {
      id: 'no-admin', kind: 'must_not', text: 'The site_manager role has administer nodes or bypass node access.',
      run: async (ctx) => {
        const p: string[] = ctx.config('user.role.site_manager')?.permissions || [];
        return { pass: !p.includes('administer nodes') && !p.includes('bypass node access') && ctx.config('user.role.site_manager')?.is_admin !== true, detail: p.join(', ') };
      },
    },
  ],
};

export default grader;
