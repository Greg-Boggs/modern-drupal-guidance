# Expectations: Unpublish all nodes of a content type

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3533315](https://www.drupal.org/node/3533315), imported as the guide `node-mass-update-is-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_bulk exists in web/modules/custom/bench_bulk and is enabled. |
| `unpublish` | MUST | Outcome | unpublishType('article') unpublishes two published articles and leaves a published page published. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call node_mass_update() or include node.admin.inc. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
