# Expectations: Latest article service and route

Checks use the service container through Drush, parse the module's `*.services.yml` with Symfony YAML, fetch the route over HTTP and run the `dependency-injection` legacy-scan rules.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | `web/modules/custom/bench_di/bench_di.info.yml` exists and the module is enabled. |
| `service` | MUST | Outcome | The container has a service `bench_di.latest_article` whose class lives in the module. |
| `service-injected` | MUST | Practice | `bench_di.services.yml` gives the service its dependencies through `arguments` or `autowire: true`. |
| `route` | MUST | Outcome | After the grader creates two published articles and a newer unpublished one, `/bench/latest-article` returns 200 for an anonymous visitor and shows "Latest article: " followed by the newer published title. |
| `no-legacy-pattern` | MUST NOT | Practice | The `dependency-injection` legacy-scan rules find a static `\Drupal::` call in a class that can take injected services. |
| `no-container-injection` | MUST NOT | Practice | The services file injects `@service_container`. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses an API that `data/drupal/deprecations.json` lists as deprecated or removed. |
