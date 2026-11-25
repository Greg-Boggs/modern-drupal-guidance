import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, practice } from '../_cr/lib.ts';

const M = 'bench_greet';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'named', kind: 'must', text: 'GET /bench-greet?name=Ann shows "Hello, Ann!" and GET /bench-greet?name=Bo then shows "Hello, Bo!".',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const a = await ctx.http('/bench-greet?name=Ann');
        const b = await ctx.http('/bench-greet?name=Bo');
        return { pass: a.body.includes('Hello, Ann!') && b.body.includes('Hello, Bo!'), detail: `${a.status} ${b.status}` };
      },
    },
    {
      id: 'default', kind: 'must', text: 'GET /bench-greet without a name shows "Hello, guest!".',
      run: async (ctx) => ctx.moduleEnabled(M) && (await ctx.http('/bench-greet')).body.includes('Hello, guest!'),
    },
    noPattern('no-request-read', 'The module reads the query from a Request object or \\Drupal::request().', mod(M), /->query->|\\Drupal::request\s*\(|getCurrentRequest\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-request-read', 'no-deprecated-api']);
