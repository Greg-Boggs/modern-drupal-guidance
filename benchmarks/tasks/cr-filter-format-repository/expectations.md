# Expectations: Text formats an account may use

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3035368](https://www.drupal.org/node/3035368), imported as the guide `new-repository-service-for-filter-formats-filter-formats`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_formats exists in web/modules/custom/bench_formats and is enabled. |
| `formats` | MUST | Outcome | For anonymous and for user 1, formatIds() and defaultFormatId() match core's filter format repository. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call the deprecated filter_*() format functions. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
