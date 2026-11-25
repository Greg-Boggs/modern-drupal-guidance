import type { Grader } from '../../../engine/src/grading/drupal/context.ts';

const s = (ctx: any) => ctx.config('block.block.olivero_main_menu')?.settings || {};

const grader: Grader = {
  checks: [
    {
      id: 'ignore-trail', kind: 'must', text: 'block.block.olivero_main_menu settings.ignore_active_trail is true.',
      run: async (ctx) => ({ pass: s(ctx).ignore_active_trail === true, detail: JSON.stringify(s(ctx)) }),
    },
    {
      id: 'other-settings-kept', kind: 'must_not', text: 'The block\'s level, depth or expand_all_items changed from the base app (1, 2, true).',
      run: async (ctx) => s(ctx).level === 1 && s(ctx).depth === 2 && s(ctx).expand_all_items === true,
    },
  ],
};

export default grader;
