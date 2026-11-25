# Expectations: Flag and run a node access rebuild from a service

Checks call the service and core's node access rebuild service through Drush.

Source: the change record [node/3534610](https://www.drupal.org/node/3534610), imported as the guide `node-access-rebuild-functions-are-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_grants exists in web/modules/custom/bench_grants and is enabled. |
| `flag` | MUST | Outcome | flag() makes core report that node access needs a rebuild, and isFlagged() returns TRUE. |
| `rebuild` | MUST | Outcome | rebuildNow() leaves core reporting no pending rebuild, isFlagged() FALSE, and the node_access table holding the default grant. |
| `no-procedural` | MUST NOT | Practice | The module does not call node_access_rebuild() or node_access_needs_rebuild(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
