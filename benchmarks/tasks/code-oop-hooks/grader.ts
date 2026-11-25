import type { Grader, GradeContext } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';
import { moduleDir, moduleEnabled, noDeprecatedApis, noLegacyFindings } from '../../../engine/src/grading/drupal/code-checks.ts';

const M = 'bench_hooks';

function savedTitle(ctx: GradeContext, type: string, title: string): string | null {
  if (!ctx.moduleEnabled(M)) return null;
  const nid = ctx.createNode(type, title);
  const r = ctx.phpEval(`print json_encode(\\Drupal\\node\\Entity\\Node::load(${nid})->label());`);
  return r.ok ? JSON.parse(r.out.split('\n').pop() || 'null') : null;
}

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'article-title', kind: 'must', text: 'An article saved as "  hello drupal world " is stored as "Hello Drupal World".',
      run: async (ctx) => {
        const t = savedTitle(ctx, 'article', '  hello drupal world ');
        return { pass: t === 'Hello Drupal World', detail: JSON.stringify(t) };
      },
    },
    {
      id: 'page-title', kind: 'must', text: 'With the module enabled, a basic page title is stored unchanged.',
      run: async (ctx) => {
        const t = savedTitle(ctx, 'page', '  hello drupal page ');
        return { pass: t !== null && t.trim() === 'hello drupal page', detail: JSON.stringify(t) };
      },
    },
    {
      id: 'help', kind: 'must', text: 'The module help text says "Bench hooks tidies article titles."',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = ctx.phpEval(`$out = \\Drupal::moduleHandler()->invoke('${M}', 'help', ['help.page.${M}', \\Drupal::routeMatch()]);
print is_array($out) ? \\Drupal::service('renderer')->renderInIsolation($out) : (string) $out;`);
        return { pass: r.out.includes('Bench hooks tidies article titles.'), detail: r.out.slice(0, 300) };
      },
    },
    {
      id: 'hook-attribute', kind: 'must', text: 'A class in src/Hook uses the #[Hook] attribute.',
      run: async (ctx) => /#\[Hook\(/.test(ctx.readAll(`${moduleDir(M)}/src/Hook`, '**/*.php')),
    },
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['hook-attribute', 'no-legacy-pattern', 'no-deprecated-api']);
