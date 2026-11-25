# Expectations: Minimal content entity type

Checks read the entity type definition and save and load an entity through Drush.

Source: the change record [node/3505422](https://www.drupal.org/node/3505422), imported as the guide `entity-type-plugins-converted-from-annotations-to`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_note exists in web/modules/custom/bench_note and is enabled. |
| `definition` | MUST | Outcome | The entity type bench_note exists as a content entity type labelled "Note" with base table bench_note and keys id, uuid and label => title. |
| `save-load` | MUST | Outcome | A note titled "Buy milk" can be saved and loaded back with its title and a UUID. |
| `no-annotation` | MUST NOT | Practice | The module declares no entity type with a @ContentEntityType docblock annotation. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
