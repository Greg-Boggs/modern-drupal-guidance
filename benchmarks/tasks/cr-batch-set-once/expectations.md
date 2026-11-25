# Expectations: Add a batch set only once per request

Checks call the service several times in one Drush request and read the batch.

Source: the change record [node/3512253](https://www.drupal.org/node/3512253), imported as the guide `new-methods-added-to-batchbuilder-to-prevent-batch-sets`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_onceb exists in web/modules/custom/bench_onceb and is enabled. |
| `one-set` | MUST | Outcome | Calling queue() three times in one request leaves exactly one batch set titled "Rebuild index". |
| `registered-id` | MUST | Practice | After queue(), core reports the set ID bench_onceb_rebuild as registered. |
| `no-own-flag` | MUST NOT | Practice | The module does not track "already queued" in a static variable or state of its own. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
