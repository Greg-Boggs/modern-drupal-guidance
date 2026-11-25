# Expectations: Adjust node duplicates when they are created

Checks duplicate a node through Drush.

Source: the change record [node/3268812](https://www.drupal.org/node/3268812), imported as the guide `new-hook-entity-duplicate-and-hook-entity-type-duplicate`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_dup exists in web/modules/custom/bench_dup and is enabled. |
| `duplicate` | MUST | Outcome | createDuplicate() of a published page "Report" returns an unsaved, unpublished node titled "Report (copy)", and the original keeps its title and status. |
| `no-save-hooks` | MUST NOT | Practice | The module does not implement presave or insert hooks for this. |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
