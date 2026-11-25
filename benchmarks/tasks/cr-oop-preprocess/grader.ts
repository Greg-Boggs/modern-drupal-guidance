import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, noPattern, php, practice } from '../_cr/lib.ts';

const M = 'bench_wordcount';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'attribute', kind: 'must', text: 'GET /node/N for a page titled "Three little words" has an <article> with data-words="3".',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const nid = php(ctx, String.raw`$n = \Drupal\node\Entity\Node::create(['type' => 'page', 'title' => 'Three little words', 'status' => 1]); $n->save(); print json_encode((int) $n->id());`);
        const r = await ctx.http(`/node/${nid}`);
        const tag = (r.body.match(/<article[^>]*>/) || [''])[0];
        return { pass: /data-words="3"/.test(tag), detail: tag.slice(0, 200) || `status ${r.status}` };
      },
    },
    noPattern('no-procedural-preprocess', 'The module defines no bench_wordcount_preprocess_node() function and has no .module file.', mod(M), /function\s+bench_wordcount_preprocess/, /\.(php|module|inc|theme)$/),
    {
      id: 'no-module-file', kind: 'must_not', text: 'web/modules/custom/bench_wordcount/bench_wordcount.module exists.',
      run: async (ctx) => !ctx.exists(`${mod(M)}/${M}.module`),
    },
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-procedural-preprocess', 'no-module-file', 'no-legacy-pattern', 'no-deprecated-api']);
