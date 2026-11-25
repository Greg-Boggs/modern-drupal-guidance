# Expectations: Count cache flushes from a hook class

Checks flush all caches through Drush and read the state counter.

Source: the change record [node/3486506](https://www.drupal.org/node/3486506), imported as the guide `drupal-supports-several-additional-hook-implementations`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_flush exists in web/modules/custom/bench_flush and is enabled. |
| `counts` | MUST | Outcome | drupal_flush_all_caches() raises bench_flush.count by exactly 1. |
| `no-module-file` | MUST NOT | Practice | web/modules/custom/bench_flush/bench_flush.module exists. |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
