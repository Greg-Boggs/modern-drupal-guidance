# Expectations: Cheap per-URL block without its own render cache entries

Checks build the block plugin and a placed instance through Drush.

Source: the change record [node/3516115](https://www.drupal.org/node/3516115), imported as the guide `block-plugins-can-now-implement-cacheoptionalinterface`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_where exists in web/modules/custom/bench_where and is enabled. |
| `output` | MUST | Outcome | For a request to /node/7 the block renders "You are at: /node/7". |
| `varies-by-path` | MUST | Outcome | The block varies by the url.path (or a broader url) cache context. |
| `cache-optional` | MUST | Practice | The block plugin implements \Drupal\Core\Cache\CacheOptionalInterface. |
| `no-block-cache-keys` | MUST | Outcome | The block view builder adds no #cache keys for a placed instance, so it gets no render cache entry of its own. |
| `cacheable` | MUST | Outcome | The block's max-age is not 0. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
