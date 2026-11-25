import type { Grader, GradeContext } from '../../../engine/src/grading/drupal/context.ts';

function role(ctx: GradeContext) {
  return ctx.config('user.role.reviewer');
}

function perms(ctx: GradeContext): string[] {
  return role(ctx)?.permissions || [];
}

const grader: Grader = {
  checks: [
    {
      id: 'role-exists', kind: 'must', text: 'Role reviewer exists with the label Reviewer.',
      run: async (ctx) => role(ctx)?.label === 'Reviewer',
    },
    {
      id: 'permissions', kind: 'must', text: 'Reviewer has access content overview and view all revisions.',
      run: async (ctx) => {
        const p = perms(ctx);
        return { pass: ['access content overview', 'view all revisions'].every((x) => p.includes(x)), detail: p.join(', ') };
      },
    },
    {
      id: 'user-rita', kind: 'must', text: 'An active user rita has the reviewer role.',
      run: async (ctx) => (ctx.content().user || []).some((u: any) => u.name === 'rita' && u.status === 1 && u.roles.includes('reviewer')),
    },
    {
      id: 'access', kind: 'must', regrade: 'recorded', text: 'rita can open /admin/content and an article\'s revisions, but cannot edit the article.',
      run: async (ctx) => {
        const nid = ctx.createNode('article', 'Bench reviewed article');
        const r = ctx.phpEval(`$ids = \\Drupal::entityQuery('user')->accessCheck(FALSE)->condition('name', 'rita')->execute();
if (!$ids) { print 'nouser'; return; }
$u = \\Drupal\\user\\Entity\\User::load(reset($ids));
$n = \\Drupal\\node\\Entity\\Node::load(${nid});
print json_encode([
  'overview' => \\Drupal\\Core\\Url::fromRoute('system.admin_content')->access($u),
  'revisions' => \\Drupal\\Core\\Url::fromRoute('entity.node.version_history', ['node' => ${nid}])->access($u),
  'update' => $n->access('update', $u),
]);`);
        const line = r.out.split('\n').pop() || '';
        if (!line.startsWith('{')) return { pass: false, detail: line };
        const a = JSON.parse(line);
        return { pass: a.overview === true && a.revisions === true && a.update === false, detail: line };
      },
    },
    {
      id: 'no-admin', kind: 'must_not', text: 'Reviewer is not an admin role and has no administer or bypass permissions.',
      run: async (ctx) => {
        const bad = perms(ctx).filter((p) => p.startsWith('administer ') || p === 'bypass node access');
        return { pass: role(ctx)?.is_admin !== true && bad.length === 0, detail: bad.join(', ') || undefined };
      },
    },
    {
      id: 'no-editing', kind: 'must_not', text: 'Reviewer has no create, edit, delete or revert content permissions.',
      run: async (ctx) => {
        const bad = perms(ctx).filter((p) => /^(create|edit|delete|revert) /.test(p));
        return { pass: bad.length === 0, detail: bad.join(', ') || undefined };
      },
    },
  ],
};

export default grader;
