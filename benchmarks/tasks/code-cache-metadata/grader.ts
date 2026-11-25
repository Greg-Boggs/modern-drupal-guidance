import type { Grader, GradeContext } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';
import { moduleDir, moduleEnabled, noDeprecatedApis, noLegacyFindings } from '../../../engine/src/grading/drupal/code-checks.ts';

const M = 'bench_cache';
let nid = 0;

function placed(ctx: GradeContext): boolean {
  return ctx.configNames('block.block.').map((n) => ctx.config(n))
    .some((c: any) => c.plugin === 'bench_article_count' && c.theme === 'olivero' && c.region === 'sidebar' && c.status === true);
}

async function count(ctx: GradeContext): Promise<string> {
  const res = await ctx.http('/');
  return res.body.match(/Published articles:\s*(?:<[^>]+>\s*)*(\d+)/)?.[1] ?? 'missing';
}

function metadata(ctx: GradeContext): { maxAge: number; tags: string[] } | null {
  if (!ctx.moduleEnabled(M)) return null;
  const r = ctx.phpEval(`use Drupal\\Core\\Cache\\CacheableMetadata;
$p = \\Drupal::service('plugin.manager.block')->createInstance('bench_article_count', []);
$build = $p->build();
\\Drupal::service('renderer')->renderInIsolation($build);
$m = CacheableMetadata::createFromRenderArray($build)->merge(CacheableMetadata::createFromObject($p));
print json_encode(['maxAge' => $m->getCacheMaxAge(), 'tags' => $m->getCacheTags()]);`);
  const line = r.out.split('\n').pop() || '';
  return line.startsWith('{') ? JSON.parse(line) : null;
}

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'placed', kind: 'must', text: 'The block is placed in Olivero\'s sidebar region.',
      run: async (ctx) => placed(ctx),
    },
    {
      id: 'initial', kind: 'must', text: 'The front page shows "Published articles: 0" and is served from the page cache on the second request.',
      run: async (ctx) => {
        if (!placed(ctx)) return false;
        const first = await count(ctx);
        const again = await ctx.http('/');
        const hit = again.headers.get('x-drupal-cache');
        return { pass: first === '0' && hit === 'HIT', detail: `count=${first} x-drupal-cache=${hit}` };
      },
    },
    {
      id: 'updates-on-publish', kind: 'must', text: 'A new published article raises the count to 1 without a cache clear.',
      run: async (ctx) => {
        if (!placed(ctx)) return false;
        nid = ctx.createNode('article', 'Bench counted article');
        const c = await count(ctx);
        return { pass: c === '1', detail: `count=${c}` };
      },
    },
    {
      id: 'updates-on-unpublish', kind: 'must', text: 'Unpublishing that article lowers the count to 0 without a cache clear.',
      run: async (ctx) => {
        if (!placed(ctx) || !nid) return false;
        ctx.phpEval(`$n = \\Drupal\\node\\Entity\\Node::load(${nid}); $n->setUnpublished(); $n->save();`);
        const c = await count(ctx);
        return { pass: c === '0', detail: `count=${c}` };
      },
    },
    {
      id: 'cache-tags', kind: 'must', text: 'The block carries the node_list or node_list:article cache tag.',
      run: async (ctx) => {
        const m = metadata(ctx);
        return { pass: !!m && (m.tags.includes('node_list') || m.tags.includes('node_list:article')), detail: JSON.stringify(m) };
      },
    },
    {
      id: 'not-uncacheable', kind: 'must_not', text: 'The block does not set max-age 0 and the module does not use the page cache kill switch.',
      run: async (ctx) => {
        const killSwitch = /page_cache_kill_switch|KillSwitch/.test(ctx.readAll(moduleDir(M), '**/*.{php,module,yml}'));
        const m = metadata(ctx);
        return { pass: !killSwitch && (!m || m.maxAge !== 0), detail: `killSwitch=${killSwitch} maxAge=${m?.maxAge}` };
      },
    },
    noLegacyFindings(M, 'cache-metadata', 'No render arrays missing cache metadata (legacy-scan cache-metadata rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['cache-tags', 'no-legacy-pattern', 'no-deprecated-api']);
