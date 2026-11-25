# Expectations: Find accounts by e-mail and name

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3555936](https://www.drupal.org/node/3555936), imported as the guide `user-load-by-mail-and-user-load-by-name-are-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_finder exists in web/modules/custom/bench_finder and is enabled. |
| `find` | MUST | Outcome | byMail() and byName() return the matching account, and NULL for unknown values. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call user_load_by_mail() or user_load_by_name(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
