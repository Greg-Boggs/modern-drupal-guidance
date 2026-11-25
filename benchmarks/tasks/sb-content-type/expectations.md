# Expectations: Event content type with fields

Checks read the site's active configuration (`drush php:script bench-state.php`, the same data as `drush config:get`) and render one event over HTTP.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `type-exists` | MUST | Outcome | Config `node.type.event` exists with the label "Event". |
| `date-field` | MUST | Outcome | `field.storage.node.field_event_date` has type `datetime` and `datetime_type: date`, and `field.field.node.event.field_event_date` is required. |
| `location-field` | MUST | Outcome | `field.storage.node.field_event_location` has type `string` and is attached to `event`. |
| `link-field` | MUST | Outcome | `field.storage.node.field_event_registration` has type `link` and is attached to `event`. |
| `form-display` | MUST | Outcome | `core.entity_form_display.node.event.default` shows all three fields. |
| `view-display` | MUST | Outcome | `core.entity_view_display.node.event.default` shows all three fields. |
| `renders` | MUST | Outcome | An event saved with the location "Bench Hall 42" shows that text at `/node/<nid>` for anonymous visitors. |
| `no-other-bundles` | MUST NOT | Outcome | No `field.field.node.<other type>.field_event_*` config exists. |
