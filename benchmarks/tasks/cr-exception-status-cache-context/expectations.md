# Expectations: Error-page hint block with a cheap cache context

Checks build the block plugin through Drush and fetch a 404 page over HTTP.

Source: the change record [node/3580452](https://www.drupal.org/node/3580452), imported as the guide `new-exception-status-code-cache-context`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_errhint exists in web/modules/custom/bench_errhint and is enabled. |
| `context` | MUST | Practice | The block varies by the exception_status_code cache context. |
| `no-url-context` | MUST | Outcome | The block does not vary by url, url.path or route. |
| `placed` | MUST | Outcome | The block is placed and enabled in Olivero's content region. |
| `http` | MUST | Outcome | An anonymous GET of a missing URL (404) shows "Try the search page." and the front page does not. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
