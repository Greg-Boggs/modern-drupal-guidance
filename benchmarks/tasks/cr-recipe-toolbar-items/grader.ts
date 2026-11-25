import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { practice } from '../_cr/lib.ts';

const DIR = 'recipes/bench_editor_tools';
const items = (ctx: any): string[] => ctx.config('editor.editor.full_html')?.settings?.toolbar?.items || [];

const grader: Grader = {
  checks: [
    {
      id: 'recipe', kind: 'must', text: 'recipes/bench_editor_tools/recipe.yml exists and is named "Bench editor tools".',
      run: async (ctx) => ctx.yaml(`${DIR}/recipe.yml`)?.name === 'Bench editor tools',
    },
    {
      id: 'one-action', kind: 'must', text: 'The recipe has one config action entry for editor.editor.full_html that adds both items as a list (addItemToToolbar or addItemsToToolbar).',
      run: async (ctx) => {
        const a = ctx.yaml(`${DIR}/recipe.yml`)?.config?.actions?.['editor.editor.full_html'] || {};
        const v = a.addItemsToToolbar ?? a.addItemToToolbar;
        const list = Array.isArray(v) ? v.map((x: any) => (typeof x === 'string' ? x : x?.item_name)) : [];
        return { pass: list.includes('specialCharacters') && list.includes('code'), detail: JSON.stringify(a) };
      },
    },
    {
      id: 'applied', kind: 'must', text: 'The active full_html editor toolbar contains specialCharacters and code and still contains bold, link and sourceEditing.',
      run: async (ctx) => {
        const i = items(ctx);
        return { pass: ['specialCharacters', 'code', 'bold', 'link', 'sourceEditing'].every((x) => i.includes(x)), detail: i.join(',') };
      },
    },
    {
      id: 'no-config-copy', kind: 'must_not', text: 'The recipe ships editor.editor.full_html.yml in its config folder.',
      run: async (ctx) => !ctx.exists(`${DIR}/config/editor.editor.full_html.yml`),
    },
  ],
};

export default practice(grader, ['one-action', 'no-config-copy']);
