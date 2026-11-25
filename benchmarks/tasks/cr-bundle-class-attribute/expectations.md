# Expectations: Article bundle class without hooks

Checks create and load nodes through Drush.

Source: the change record [node/3574891](https://www.drupal.org/node/3574891), imported as the guide `entity-bundle-classes-can-be-defined-and-discovered-using`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_bundle exists in web/modules/custom/bench_bundle and is enabled. |
| `article-class` | MUST | Outcome | An article node is an instance of Drupal\bench_bundle\Entity\Article and shout() returns the upper-cased title. |
| `page-plain` | MUST | Outcome | A basic page node is a plain Drupal\node\Entity\Node. |
| `no-bundle-hooks` | MUST NOT | Practice | The module implements no entity_bundle_info, entity_bundle_info_alter or entity_type_alter hook. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
