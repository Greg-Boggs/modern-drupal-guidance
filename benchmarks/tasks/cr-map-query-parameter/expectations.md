# Expectations: Controller argument from a query parameter

Checks fetch the page over HTTP with and without the query parameter.

Source: the change record [node/3567958](https://www.drupal.org/node/3567958), imported as the guide `query-parameters-can-be-mapped-directly-to-controller`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_greet exists in web/modules/custom/bench_greet and is enabled. |
| `named` | MUST | Outcome | GET /bench-greet?name=Ann shows "Hello, Ann!" and GET /bench-greet?name=Bo then shows "Hello, Bo!". |
| `default` | MUST | Outcome | GET /bench-greet without a name shows "Hello, guest!". |
| `no-request-read` | MUST NOT | Practice | The module reads the query from a Request object or \Drupal::request(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
