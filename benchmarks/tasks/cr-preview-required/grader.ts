import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { phpCheck } from '../_cr/lib.ts';

const grader: Grader = {
  checks: [
    phpCheck('required', 'NodeType article getPreviewMode(FALSE) is NodePreviewMode::Required.', null, String.raw`$m = \Drupal\node\Entity\NodeType::load('article')->getPreviewMode(FALSE);
print json_encode(['pass' => $m === \Drupal\node\NodePreviewMode::Required, 'detail' => is_object($m) ? $m->name : $m]);`),
    {
      id: 'config', kind: 'must', text: 'node.type.article preview_mode is 2 (required).',
      run: async (ctx) => ctx.config('node.type.article')?.preview_mode === 2,
    },
  ],
};

export default grader;
