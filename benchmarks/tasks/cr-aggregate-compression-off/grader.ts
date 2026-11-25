import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';

const perf = (ctx: any) => ctx.config('system.performance') || {};

const grader: Grader = {
  checks: [
    {
      id: 'css-off', kind: 'must', text: 'system.performance css.compress is false.',
      run: async (ctx) => ({ pass: perf(ctx).css?.compress === false, detail: JSON.stringify(perf(ctx).css) }),
    },
    {
      id: 'js-off', kind: 'must', text: 'system.performance js.compress is false.',
      run: async (ctx) => ({ pass: perf(ctx).js?.compress === false, detail: JSON.stringify(perf(ctx).js) }),
    },
    {
      id: 'no-legacy-keys', kind: 'must_not', text: 'system.performance has the removed css.gzip or js.gzip keys.',
      run: async (ctx) => ({ pass: !('gzip' in (perf(ctx).css || {})) && !('gzip' in (perf(ctx).js || {})) }),
    },
    {
      id: 'aggregation-unchanged', kind: 'must_not', text: 'CSS or JS aggregation (preprocess) was changed from the base app\'s setting (off).',
      run: async (ctx) => ({ pass: perf(ctx).css?.preprocess === false && perf(ctx).js?.preprocess === false }),
    },
  ],
};

export default practice(grader, ['no-legacy-keys']);
