# Expectations: Custom node add/edit form class

Checks read the node entity type definition and build a node form through Drush.

Source: the change record [node/3517871](https://www.drupal.org/node/3517871), imported as the guide `nodeform-and-nodetypeform-have-moved-to-the-drupal-node`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_nodeform exists in web/modules/custom/bench_nodeform and is enabled. |
| `handler` | MUST | Outcome | The node entity type's default form handler is Drupal\bench_nodeform\Form\BenchNodeForm, a subclass of Drupal\node\Form\NodeForm. |
| `reminder` | MUST | Outcome | Building the add form for an article as user 1 includes bench_reminder with "Remember to proofread." and core's title field. |
| `no-old-namespace` | MUST NOT | Practice | The module does not reference the old Drupal\node\NodeForm class name. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
