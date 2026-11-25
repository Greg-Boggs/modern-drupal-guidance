# Expectations: Rename a route and keep the old name working

Checks fetch the page over HTTP, generate a URL from the old route name through Drush and parse the routing file.

Source: the change record [node/3317784](https://www.drupal.org/node/3317784), imported as the guide `added-support-for-route-aliases-and-deprecation`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_shop exists in web/modules/custom/bench_shop and is enabled. |
| `page` | MUST | Outcome | GET /bench-shop returns 200 with "Welcome to the shop." |
| `old-name-resolves` | MUST | Outcome | Url::fromRoute('bench_shop.list') generates /bench-shop. |
| `alias-deprecated` | MUST | Outcome | bench_shop.routing.yml declares bench_shop.list with alias bench_shop.catalog and a deprecated entry with package, version and message. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
