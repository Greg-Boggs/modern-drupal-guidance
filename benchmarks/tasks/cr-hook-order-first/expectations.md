# Expectations: Run a form alter before every other module

Checks inspect hook implementations through the module handler in Drush.

Source: the change record [node/3493962](https://www.drupal.org/node/3493962), imported as the guide `hook-implementations-can-be-ordered-with-an-order-parameter`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module zbench_first exists in web/modules/custom/zbench_first and is enabled. |
| `first` | MUST | Outcome | zbench_first is the first module invoked for form_alter, ahead of field_ui. |
| `alters` | MUST | Outcome | Building the user login form sets #zbench_first. |
| `weight-unchanged` | MUST NOT | Practice | core.extension gives zbench_first a non-zero module weight. |
| `no-implements-alter` | MUST NOT | Practice | The module implements hook_module_implements_alter(). |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
