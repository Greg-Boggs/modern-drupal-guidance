# Expectations: Remove another module's help text

Checks inspect hook implementations through the module handler in Drush.

Source: the change record [node/3496786](https://www.drupal.org/node/3496786), imported as the guide `hook-implementations-can-now-be-removed-with-a-removehook`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_nohelp exists in web/modules/custom/bench_nohelp and is enabled. |
| `removed` | MUST | Outcome | announcements_feed no longer has a help implementation, while it stays enabled. |
| `others-kept` | MUST | Outcome | Other modules' help hooks still run (node has a help implementation). |
| `no-implements-alter` | MUST NOT | Practice | The module implements hook_module_implements_alter(). |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
