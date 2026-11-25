import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';
import { moduleDir, moduleEnabled, noDeprecatedApis, noLegacyFindings } from '../../../engine/src/grading/drupal/code-checks.ts';

const M = 'bench_block';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'definition', kind: 'must', text: 'Block plugin bench_greeting exists with the admin label Bench greeting.',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = ctx.phpEval(`$m = \\Drupal::service('plugin.manager.block'); print $m->hasDefinition('bench_greeting') ? (string) $m->getDefinition('bench_greeting')['admin_label'] : 'missing';`);
        return { pass: r.out.endsWith('Bench greeting'), detail: r.out.slice(-200) };
      },
    },
    {
      id: 'attribute', kind: 'must', text: 'The plugin is declared with the #[Block] attribute.',
      run: async (ctx) => /#\[Block\(/.test(ctx.readAll(`${moduleDir(M)}/src/Plugin/Block`, '**/*.php')),
    },
    {
      id: 'config-form', kind: 'must', text: 'Saving a greeting in the block form changes the rendered text.',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = ctx.phpEval(`use Drupal\\Core\\Form\\FormState;
$p = \\Drupal::service('plugin.manager.block')->createInstance('bench_greeting', []);
$form = $p->blockForm([], new FormState());
$key = NULL;
foreach (\\Drupal\\Core\\Render\\Element::children($form) as $k) { if (in_array($form[$k]['#type'] ?? '', ['textfield', 'textarea'], TRUE)) { $key = $k; break; } }
if ($key === NULL) { print 'no text field'; return; }
$fs = new FormState(); $fs->setValues([$key => 'Howdy, bench']);
$p->blockSubmit($form, $fs);
$build = $p->build();
print 'OUT:' . \\Drupal::service('renderer')->renderInIsolation($build);`);
        return { pass: /OUT:[\s\S]*Howdy, bench/.test(r.out), detail: r.out.slice(-300) };
      },
    },
    {
      id: 'renders', kind: 'must', text: 'The block is placed in Olivero\'s content region and the front page shows the default greeting.',
      run: async (ctx) => {
        const placed = ctx.configNames('block.block.').map((n) => ctx.config(n))
          .some((c: any) => c.plugin === 'bench_greeting' && c.theme === 'olivero' && c.region === 'content' && c.status === true);
        if (!placed) return { pass: false, detail: 'not placed' };
        const res = await ctx.http('/');
        return { pass: res.body.includes('Hello from the benchmark'), detail: `HTTP ${res.status}` };
      },
    },
    noLegacyFindings(M, 'plugin-attributes', 'No @Block annotation (legacy-scan plugin-attributes rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['attribute', 'no-legacy-pattern', 'no-deprecated-api']);
