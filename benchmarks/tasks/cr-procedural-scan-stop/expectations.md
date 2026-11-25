# Expectations: Keep helper functions from being read as hooks

Checks inspect hook implementations through the module handler in Drush.

Source: the change record [node/3498595](https://www.drupal.org/node/3498595), imported as the guide `hooks-converted-parameter-and-stopproceduralhookscan`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_helpers exists in web/modules/custom/bench_helpers and is enabled. |
| `helpers` | MUST | Outcome | bench_helpers_help() and bench_helpers_cron_label() exist and return their strings. |
| `not-a-hook` | MUST | Outcome | bench_helpers has no help implementation registered. |
| `no-old-names` | MUST NOT | Practice | The module uses the renamed-away hooks_converted parameter or StopProceduralHookScan attribute. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
