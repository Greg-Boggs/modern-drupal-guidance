# Expectations: Commit a database transaction explicitly

Checks call the service through Drush and read the key-value store.

Source: the change record [node/3512006](https://www.drupal.org/node/3512006), imported as the guide `transaction-commitorrelease-method-introduced-to-explicity`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_tx exists in web/modules/custom/bench_tx and is enabled. |
| `writes` | MUST | Outcome | writePair('x', 'y') stores a => x and b => y in the bench_tx key-value collection. |
| `no-open-transaction` | MUST | Outcome | After writePair() returns, no transaction is left open on the connection. |
| `explicit-commit` | MUST | Practice | The module calls commitOrRelease() on its transaction. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
