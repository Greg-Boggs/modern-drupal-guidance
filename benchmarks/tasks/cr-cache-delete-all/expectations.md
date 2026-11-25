# Expectations: Empty a custom cache bin completely

Checks write to and reset the cache bin through Drush.

Source: the change record [node/3500622](https://www.drupal.org/node/3500622), imported as the guide `cachebackendinterface-invalidateall-is-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_reports exists in web/modules/custom/bench_reports and is enabled. |
| `bin` | MUST | Outcome | cache.bench_reports is a cache backend and save() writes to it. |
| `reset` | MUST | Outcome | After reset(), get('r1', TRUE) (allowing invalid items) returns FALSE. |
| `no-invalidate-all` | MUST NOT | Practice | The module calls invalidateAll() or truncates cache tables directly. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
