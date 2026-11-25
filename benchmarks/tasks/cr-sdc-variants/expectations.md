# Expectations: Single-directory component with named variants

Checks read the component definition and render the component through Drush.

Source: the change record [node/3517062](https://www.drupal.org/node/3517062), imported as the guide `added-component-variants-to-sdc`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_sdc exists in web/modules/custom/bench_sdc and is enabled. |
| `variants` | MUST | Practice | The component definition bench_sdc:callout declares variants info ("Information") and warning ("Warning") with the warning description. |
| `render-warning` | MUST | Outcome | Rendering the component with variant warning and message "Disk full" outputs a callout--warning div with the message. |
| `render-default` | MUST | Outcome | Rendering it without a variant outputs callout--info. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
