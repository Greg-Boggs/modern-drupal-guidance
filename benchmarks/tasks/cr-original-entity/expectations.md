# Expectations: Log title changes on node update

Checks create and update a node through Drush and read the state log.

Source: the change record [node/3295826](https://www.drupal.org/node/3295826), imported as the guide `new-methods-to-access-original-unchanged-entity-during`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_retitle exists in web/modules/custom/bench_retitle and is enabled. |
| `logs-change` | MUST | Outcome | Creating "Alpha", re-saving it unchanged, then renaming it to "Beta" logs exactly ["Alpha -> Beta"]. |
| `no-original-property` | MUST NOT | Practice | The module does not read the legacy $entity->original property. |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
