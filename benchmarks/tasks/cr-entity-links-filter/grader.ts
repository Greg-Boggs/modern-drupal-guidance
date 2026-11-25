import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { noPattern, php } from '../_cr/lib.ts';

const fmt = (ctx: any) => ctx.config('filter.format.basic_html') || {};

const grader: Grader = {
  checks: [
    {
      id: 'filter-enabled', kind: 'must', text: 'The entity_links filter is enabled on the basic_html text format.',
      run: async (ctx) => ({ pass: fmt(ctx).filters?.entity_links?.status === true, detail: JSON.stringify(fmt(ctx).filters?.entity_links ?? null) }),
    },
    {
      id: 'other-filters-kept', kind: 'must_not', text: 'filter_html was disabled on basic_html.',
      run: async (ctx) => fmt(ctx).filters?.filter_html?.status === true,
    },
    {
      id: 'renders-link', kind: 'must', text: 'Text with an entity link to a node, filtered through basic_html, outputs a link to that node\'s current alias.',
      run: async (ctx) => {
        const v = php(ctx, String.raw`$n = \Drupal\node\Entity\Node::create(['type' => 'page', 'title' => 'Target', 'status' => 1, 'path' => ['alias' => '/bench-target']]); $n->save();
$text = '<p><a data-entity-type="node" data-entity-uuid="' . $n->uuid() . '" href="/node/' . $n->id() . '">x</a></p>';
$build = ['#type' => 'processed_text', '#text' => $text, '#format' => 'basic_html'];
print json_encode((string) \Drupal::service('renderer')->renderInIsolation($build));`);
        return { pass: /href="[^"]*\/bench-target"/.test(v), detail: String(v).slice(0, 300) };
      },
    },
    noPattern('no-custom-code', 'No custom module code was written for it.', 'web/modules/custom', /[\s\S]+/, /\.(php|module|yml)$/),
  ],
};

export default grader;
