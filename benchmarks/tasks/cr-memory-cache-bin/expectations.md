# Expectations: Request-scoped memoization through core's memory cache bin

Checks call the service and read core's cache bins through Drush.

Source: the change record [node/3546856](https://www.drupal.org/node/3546856), imported as the guide `new-cache-memory-cache-bin-replaces-cache-static`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_memo exists in web/modules/custom/bench_memo and is enabled. |
| `square` | MUST | Outcome | square(7) returns 49. |
| `memory-bin` | MUST | Practice | After square(4), core's cache.memory bin holds bench_memo:square:4 with the value 16. |
| `tag-invalidation` | MUST | Outcome | After square(5) the item bench_memo:square:5 is in a request-scoped memory bin, and invalidating the bench_memo cache tag removes it in the same request. |
| `not-persistent` | MUST | Outcome | Nothing is written to the persistent default bin. |
| `no-static-bin` | MUST NOT | Practice | The module does not use the deprecated cache.static bin, the cache.backend.memory backend or \Drupal\Core\Cache\MemoryBackend. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
