# Expectations: List content type labels

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3534849](https://www.drupal.org/node/3534849), imported as the guide `node-type-get-names-is-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_types exists in web/modules/custom/bench_types and is enabled. |
| `names` | MUST | Outcome | nodeTypeNames() returns article => Article and page => Basic page, and includes a content type created by the grader. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call node_type_get_names(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
