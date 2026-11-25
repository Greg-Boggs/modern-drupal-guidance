import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { phpCheck } from '../_cr/lib.ts';

const grader: Grader = {
  checks: [
    {
      id: 'role', kind: 'must', text: 'The role block_reviewer exists with the label "Block reviewer".',
      run: async (ctx) => ctx.config('user.role.block_reviewer')?.label === 'Block reviewer',
    },
    phpCheck('view-unpublished', 'A user with only block_reviewer has view access to an unpublished basic block_content entity.', null, String.raw`if (!\Drupal\user\Entity\Role::load('block_reviewer')) { print json_encode(FALSE); return; }
$u = \Drupal\user\Entity\User::create(['name' => 'br' . rand(), 'status' => 1, 'roles' => ['block_reviewer']]); $u->save();
$b = \Drupal\block_content\Entity\BlockContent::create(['type' => 'basic', 'info' => 'Draft block', 'status' => 0]); $b->save();
print json_encode($b->access('view', $u));`),
    {
      id: 'no-admin', kind: 'must_not', text: 'block_reviewer has administer block content or access block library.',
      run: async (ctx) => {
        const p: string[] = ctx.config('user.role.block_reviewer')?.permissions || [];
        return { pass: !p.includes('administer block content') && !p.includes('access block library'), detail: p.join(', ') };
      },
    },
  ],
};

export default grader;
