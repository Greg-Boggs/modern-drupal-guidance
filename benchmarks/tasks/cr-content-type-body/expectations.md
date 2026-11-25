# Expectations: Event content type with a body field

Checks read active configuration.

Source: the change record [node/3516778](https://www.drupal.org/node/3516778), imported as the guide `node-add-body-field-is-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `type` | MUST | Outcome | The node type event exists with the label "Event". |
| `field` | MUST | Outcome | field.field.node.event.body exists, uses the shared body storage and is labelled "Body". |
| `form-display` | MUST | Outcome | The default form display of event shows body. |
| `view-display` | MUST | Outcome | The default view display of event shows body. |
