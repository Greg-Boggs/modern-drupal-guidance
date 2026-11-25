# Expectations: Content type label of a node

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3533301](https://www.drupal.org/node/3533301), imported as the guide `node-get-type-label-is-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_typelabel exists in web/modules/custom/bench_typelabel and is enabled. |
| `label` | MUST | Outcome | label() returns "Article" for an article and "Basic page" for a page. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call node_get_type_label(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
