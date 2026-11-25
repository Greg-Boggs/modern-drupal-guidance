# Expectations: Service that receives a lazy service closure

Checks inspect the service object and call it through Drush.

Source: the change record [node/3527390](https://www.drupal.org/node/3527390), imported as the guide `added-support-for-as-a-shorthand-for-service-closure-in`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_lazy exists in web/modules/custom/bench_lazy and is enabled. |
| `closure-arg` | MUST | Outcome | The service object holds a closure that returns the entity type manager. |
| `count` | MUST | Outcome | nodeCount() returns the number of nodes (2 after creating two). |
| `no-long-syntax` | MUST NOT | Practice | bench_lazy.services.yml uses the long !service_closure tag. |
| `no-static-container` | MUST NOT | Practice | The module calls \Drupal:: or receives the service container. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
