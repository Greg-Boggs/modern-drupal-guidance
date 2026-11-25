# Expectations: Batch operations on an injected service

Checks resolve the batch callbacks with core's callable resolver and run the batch non-progressively through Drush.

Source: the change record [node/3570904](https://www.drupal.org/node/3570904), imported as the guide `batch-api-callbacks-now-support-callables-supported-by-the`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_batch exists in web/modules/custom/bench_batch and is enabled. |
| `ops-are-service-callables` | MUST | Practice | Every operation callback is a "service:method" string that resolves to the bench_batch.counter service. |
| `finished-is-service-callable` | MUST | Practice | The finished callback is a "service:method" string that resolves to the bench_batch.counter service. |
| `runs` | MUST | Outcome | Processing the batch non-progressively leaves bench_batch.count at 3 and bench_batch.done TRUE. |
| `no-object-callbacks` | MUST NOT | Practice | The module does not pass [$this, ...] arrays or closures as batch callbacks. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
