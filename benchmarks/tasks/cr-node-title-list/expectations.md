# Expectations: Render a list of linked node titles

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3531959](https://www.drupal.org/node/3531959), imported as the guide `node-title-list-is-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_titles exists in web/modules/custom/bench_titles and is enabled. |
| `links` | MUST | Outcome | build([second, first], "Picks") renders links to both nodes in that order under "Picks", and carries node:N tags for both. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call node_title_list(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
