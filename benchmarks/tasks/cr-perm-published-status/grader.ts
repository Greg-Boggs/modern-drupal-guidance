import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { phpCheck } from '../_cr/lib.ts';

const grader: Grader = {
  checks: [
    phpCheck('field-access', 'For a user with only content_editor, edit access to a page node\'s status field is allowed.', null, String.raw`$u = \Drupal\user\Entity\User::create(['name' => 'ce' . rand(), 'status' => 1, 'roles' => ['content_editor']]); $u->save();
$n = \Drupal\node\Entity\Node::create(['type' => 'page', 'title' => 'P', 'status' => 1]); $n->save();
print json_encode($n->get('status')->access('edit', $u));`),
    {
      id: 'no-admin', kind: 'must_not', text: 'content_editor has administer nodes or bypass node access.',
      run: async (ctx) => {
        const p: string[] = ctx.config('user.role.content_editor')?.permissions || [];
        return { pass: !p.includes('administer nodes') && !p.includes('bypass node access'), detail: p.length + ' permissions' };
      },
    },
  ],
};

export default grader;
