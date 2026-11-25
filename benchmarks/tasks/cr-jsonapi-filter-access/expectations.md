# Expectations: JSON:API filter access for published users

Checks invoke the module's filter access hook through Drush for users with and without the permission.

Source: the change record [node/3495601](https://www.drupal.org/node/3495601), imported as the guide `json-api-filter-constants-have-been-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_apifilter exists in web/modules/custom/bench_apifilter and is enabled. |
| `allowed` | MUST | Outcome | For an account with "access user profiles", the module's hook returns an allowed result keyed filter_among_enabled. |
| `not-allowed` | MUST | Outcome | For an account without that permission the result is not allowed. |
| `no-deprecated-constants` | MUST NOT | Practice | The module does not use the deprecated JSONAPI_FILTER_* global constants. |
| `no-literal-key` | MUST NOT | Practice | The module does not hard-code the "filter_among_*" key string. |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
