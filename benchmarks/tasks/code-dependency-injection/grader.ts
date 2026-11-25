import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';
import { moduleDir, moduleEnabled, noDeprecatedApis, noLegacyFindings } from '../../../engine/src/grading/drupal/code-checks.ts';

const M = 'bench_di';
const SERVICE = 'bench_di.latest_article';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'service', kind: 'must', text: `The container has a service ${SERVICE} from the module.`,
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = ctx.phpEval(`print \\Drupal::hasService('${SERVICE}') ? get_class(\\Drupal::service('${SERVICE}')) : 'missing';`);
        return { pass: r.out.includes('Drupal\\bench_di\\'), detail: r.out.slice(-200) };
      },
    },
    {
      id: 'service-injected', kind: 'must', text: 'The service gets its dependencies through arguments or autowiring.',
      run: async (ctx) => {
        const y = ctx.yaml(`${moduleDir(M)}/${M}.services.yml`);
        const def = y?.services?.[SERVICE];
        const autowire = def?.autowire === true || y?.services?._defaults?.autowire === true;
        return { pass: !!def && (autowire || (Array.isArray(def.arguments) && def.arguments.length > 0)), detail: JSON.stringify(def ?? null) };
      },
    },
    {
      id: 'route', kind: 'must', text: '/bench/latest-article shows the newest published article title.',
      run: async (ctx) => {
        const base = 1_800_000_000;
        ctx.createNode('article', 'Bench older article', `'created' => ${base}`);
        ctx.createNode('article', 'Bench newer article', `'created' => ${base + 100}`);
        ctx.createNode('article', 'Bench unpublished article', `'created' => ${base + 200}, 'status' => 0`);
        const res = await ctx.http('/bench/latest-article');
        return { pass: res.status === 200 && res.body.includes('Latest article: Bench newer article'), detail: `HTTP ${res.status} ${res.body.slice(0, 120).replace(/\s+/g, ' ')}` };
      },
    },
    noLegacyFindings(M, 'dependency-injection', 'No static \\Drupal:: calls in injectable classes (legacy-scan dependency-injection rules).'),
    {
      id: 'no-container-injection', kind: 'must_not', text: 'The services file does not inject @service_container.',
      run: async (ctx) => !ctx.read(`${moduleDir(M)}/${M}.services.yml`).includes('@service_container'),
    },
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['service-injected', 'no-legacy-pattern', 'no-container-injection', 'no-deprecated-api']);
