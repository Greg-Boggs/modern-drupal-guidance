# Expectations: Migration that reads this site's config entities

Checks load the migration and iterate its source plugin through Drush.

Source: the change record [node/3508578](https://www.drupal.org/node/3508578), imported as the guide `the-d8-config-migrate-source-plugin-is-replaced-by-the`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_cfgmig exists in web/modules/custom/bench_cfgmig and is enabled. |
| `no-migrate-drupal` | MUST NOT | Outcome | The migrate_drupal module is enabled. |
| `source` | MUST | Practice | Migration bench_cfgmig_types loads and its source plugin is core's config_entity plugin (Drupal\migrate\Plugin\migrate\source\ConfigEntity). |
| `rows` | MUST | Outcome | The migration yields exactly two rows, and its process pipeline maps them to the labels Article and Basic page. |
| `no-d8-config` | MUST NOT | Practice | The module does not use the deprecated d8_config source plugin. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
