# Expectations: Permission-gated node operation with correct cacheability

Checks call the node list builder's getOperations() through Drush as users with and without the permission.

Source: the change record [node/3533080](https://www.drupal.org/node/3533080), imported as the guide `entity-operations-methods-can-now-add-cacheable-metadata`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_ops exists in web/modules/custom/bench_ops and is enabled. |
| `permission` | MUST | Outcome | The permission "view bench report" is defined. |
| `op-with-permission` | MUST | Outcome | For a user with the permission, the node's operations include bench_report titled "Report" linking to the node. |
| `no-op-without-permission` | MUST | Outcome | For a user without the permission, bench_report is absent. |
| `cacheability` | MUST | Outcome | The cacheability passed to getOperations() gains the user.permissions cache context for a user without the permission. |
| `no-max-age-zero` | MUST NOT | Practice | The module does not make the operations uncacheable with max-age 0. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
