# Expectations: Content type description of a node type

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3531945](https://www.drupal.org/node/3531945), imported as the guide `node-type-get-description-is-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_typedesc exists in web/modules/custom/bench_typedesc and is enabled. |
| `description` | MUST | Outcome | description() returns the article type's description and the text of a type created by the grader. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call node_type_get_description(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
