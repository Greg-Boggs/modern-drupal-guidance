import type { Grader, GradeContext } from '../../../engine/src/grading/drupal/context.ts';

const FIELDS = ['field_event_date', 'field_event_location', 'field_event_registration'];

function shows(ctx: GradeContext, name: string) {
  const content = ctx.config(name)?.content || {};
  const missing = FIELDS.filter((f) => !content[f]);
  return { pass: missing.length === 0, detail: missing.length ? `missing: ${missing.join(', ')}` : undefined };
}

const grader: Grader = {
  checks: [
    {
      id: 'type-exists', kind: 'must', text: 'Content type event exists with the label Event.',
      run: async (ctx) => ctx.config('node.type.event')?.name === 'Event',
    },
    {
      id: 'date-field', kind: 'must', text: 'field_event_date is a required date-only datetime field on event.',
      run: async (ctx) => {
        const s = ctx.config('field.storage.node.field_event_date');
        const f = ctx.config('field.field.node.event.field_event_date');
        return { pass: s?.type === 'datetime' && s?.settings?.datetime_type === 'date' && f?.required === true,
          detail: `storage=${s?.type}/${s?.settings?.datetime_type} required=${f?.required}` };
      },
    },
    {
      id: 'location-field', kind: 'must', text: 'field_event_location is a plain text (string) field on event.',
      run: async (ctx) => ctx.config('field.storage.node.field_event_location')?.type === 'string'
        && !!ctx.config('field.field.node.event.field_event_location'),
    },
    {
      id: 'link-field', kind: 'must', text: 'field_event_registration is a link field on event.',
      run: async (ctx) => ctx.config('field.storage.node.field_event_registration')?.type === 'link'
        && !!ctx.config('field.field.node.event.field_event_registration'),
    },
    {
      id: 'form-display', kind: 'must', text: 'The default form display shows all three fields.',
      run: async (ctx) => shows(ctx, 'core.entity_form_display.node.event.default'),
    },
    {
      id: 'view-display', kind: 'must', text: 'The default view display shows all three fields.',
      run: async (ctx) => shows(ctx, 'core.entity_view_display.node.event.default'),
    },
    {
      id: 'renders', kind: 'must', text: 'An event shows its location to anonymous visitors.',
      run: async (ctx) => {
        if (!ctx.config('node.type.event')) return { pass: false, detail: 'no event type' };
        const nid = ctx.createNode('event', 'Bench event',
          "'field_event_date' => '2027-03-01', 'field_event_location' => 'Bench Hall 42', 'field_event_registration' => ['uri' => 'https://example.com/register']");
        const res = await ctx.http(`/node/${nid}`);
        return { pass: res.status === 200 && res.body.includes('Bench Hall 42'), detail: `HTTP ${res.status}` };
      },
    },
    {
      id: 'no-other-bundles', kind: 'must_not', text: 'The event fields are not attached to other content types.',
      run: async (ctx) => {
        const extra = ctx.configNames('field.field.node.').filter((n) => /field_event_/.test(n) && !n.startsWith('field.field.node.event.'));
        return { pass: extra.length === 0, detail: extra.join(', ') || undefined };
      },
    },
  ],
};

export default grader;
