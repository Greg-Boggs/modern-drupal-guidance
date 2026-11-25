import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { phpCheck } from '../_cr/lib.ts';

const grader: Grader = {
  checks: [
    {
      id: 'type', kind: 'must', text: 'The node type news exists with the label "News".',
      run: async (ctx) => ctx.config('node.type.news')?.name === 'News',
    },
    phpCheck('default-promoted', 'A new news node created without a promote value is promoted.', null, String.raw`if (!\Drupal\node\Entity\NodeType::load('news')) { print json_encode(FALSE); return; }
$n = \Drupal\node\Entity\Node::create(['type' => 'news', 'title' => 'N']);
print json_encode((bool) $n->isPromoted());`),
    {
      id: 'on-form', kind: 'must', text: 'The default form display of news includes the promote field.',
      run: async (ctx) => !!ctx.config('core.entity_form_display.node.news.default')?.content?.promote,
    },
  ],
};

export default grader;
