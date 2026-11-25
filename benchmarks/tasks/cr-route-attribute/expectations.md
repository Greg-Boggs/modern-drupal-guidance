# Expectations: Define a route on the controller

Checks fetch the page over HTTP and read the route through Drush.

Source: the change record [node/3324758](https://www.drupal.org/node/3324758), imported as the guide `php-attributes-can-be-used-for-route-definition-and`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_attr exists in web/modules/custom/bench_attr and is enabled. |
| `page` | MUST | Outcome | GET /bench-hello returns 200 with "Hello from a controller." |
| `route-name` | MUST | Outcome | The route bench_attr.hello exists with path /bench-hello and title Hello. |
| `no-routing-yml` | MUST NOT | Practice | web/modules/custom/bench_attr/bench_attr.routing.yml exists. |
| `no-route-subscriber` | MUST NOT | Practice | The module has a route subscriber. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
