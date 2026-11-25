# Expectations: Move another module's hook implementation to the end

Checks inspect hook implementations through the module handler in Drush.

Source: the change record [node/3497308](https://www.drupal.org/node/3497308), imported as the guide `reorder-hook-implementations-in-other-modules-with-the`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module zbench_reorder exists in web/modules/custom/zbench_reorder and is enabled. |
| `field-ui-last` | MUST | Outcome | field_ui is the last module invoked for form_alter and zbench_reorder runs before it. |
| `no-own-order` | MUST NOT | Practice | This module's own form_alter Hook attribute declares an order. |
| `no-implements-alter` | MUST NOT | Practice | The module implements hook_module_implements_alter(). |
| `weight-unchanged` | MUST NOT | Practice | core.extension gives zbench_reorder or field_ui a non-zero module weight. |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
