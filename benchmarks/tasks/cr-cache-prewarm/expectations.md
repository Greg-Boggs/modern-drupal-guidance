# Expectations: Catalog service that Drupal can warm ahead of requests

Checks call the service and core's cache prewarmer through Drush.

Source: the change record [node/3386853](https://www.drupal.org/node/3386853), imported as the guide `new-cache-prewarm-api`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_catalog exists in web/modules/custom/bench_catalog and is enabled. |
| `get-items` | MUST | Outcome | bench_catalog.catalog->getItems() returns [alpha, beta, gamma] and stores it under bench_catalog:items in the default bin. |
| `prewarmable` | MUST | Practice | The service implements \Drupal\Core\PreWarm\PreWarmableInterface. |
| `prewarmer-fills-cache` | MUST | Outcome | With the cache item deleted, core's cache_prewarmer->preWarmAllCaches() fills bench_catalog:items. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
