import type { Grader } from '../../../engine/src/grading/drupal/context.ts';

const grader: Grader = {
  checks: [
    {
      id: 'type', kind: 'must', text: 'The node type event exists with the label "Event".',
      run: async (ctx) => ctx.config('node.type.event')?.name === 'Event',
    },
    {
      id: 'field', kind: 'must', text: 'field.field.node.event.body exists, uses the shared body storage and is labelled "Body".',
      run: async (ctx) => {
        const f = ctx.config('field.field.node.event.body');
        return { pass: f?.field_name === 'body' && f?.label === 'Body' && f?.field_type === ctx.config('field.storage.node.body')?.type, detail: JSON.stringify(f ? { label: f.label, type: f.field_type } : null) };
      },
    },
    {
      id: 'form-display', kind: 'must', text: 'The default form display of event shows body.',
      run: async (ctx) => !!ctx.config('core.entity_form_display.node.event.default')?.content?.body,
    },
    {
      id: 'view-display', kind: 'must', text: 'The default view display of event shows body.',
      run: async (ctx) => !!ctx.config('core.entity_view_display.node.event.default')?.content?.body,
    },
  ],
};

export default grader;
