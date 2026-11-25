import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { php } from '../_cr/lib.ts';

const grader: Grader = {
  checks: [
    {
      id: 'threshold', kind: 'must', text: 'Settings::get(\'asset_gc_threshold\') is 864000 seconds (ten days).',
      run: async (ctx) => {
        const v = php(ctx, String.raw`print json_encode(\Drupal\Core\Site\Settings::get('asset_gc_threshold'));`);
        return { pass: v === 864000, detail: JSON.stringify(v) };
      },
    },
    {
      id: 'in-settings-php', kind: 'must', text: 'The value is set in web/sites/default/settings.php.',
      run: async (ctx) => /\$settings\[\s*['"]asset_gc_threshold['"]\s*\]\s*=/.test(ctx.read('web/sites/default/settings.php')),
    },
  ],
};

export default grader;
