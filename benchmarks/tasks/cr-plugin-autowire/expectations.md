# Expectations: Block plugin with constructor injection and no factory method

Checks build the block plugin and reflect on its class through Drush.

Source: the change record [node/3542837](https://www.drupal.org/node/3542837), imported as the guide `pluginbase-provides-create-factory-method-with-autowired`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_users exists in web/modules/custom/bench_users and is enabled. |
| `renders` | MUST | Outcome | The block renders "Users: N" with N equal to the number of non-anonymous accounts. |
| `inherited-create` | MUST | Practice | The block class does not declare create(); the method comes from core. |
| `no-static` | MUST NOT | Practice | The module calls \Drupal::. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
