# Expectations: Status report check for a missing API key

Checks list the status report requirements through Drush with and without the state value.

Source: the change record [node/3490851](https://www.drupal.org/node/3490851), imported as the guide `added-hook-runtime-requirements-and-hook-runtime`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_req exists in web/modules/custom/bench_req and is enabled. |
| `warning` | MUST | Outcome | With bench_req.api_key empty, the status report has bench_req_api_key titled "Bench API key" with Warning severity and value "Not configured". |
| `ok` | MUST | Outcome | With bench_req.api_key set, the entry has OK severity and value "Configured". |
| `no-legacy-requirements` | MUST NOT | Practice | The module does not implement hook_requirements() or use REQUIREMENT_* constants or drupal_requirements_severity(). |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
