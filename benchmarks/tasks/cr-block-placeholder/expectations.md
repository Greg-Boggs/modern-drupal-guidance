# Expectations: Always-placeholdered statistics block

Checks build the block plugin and a placed instance through Drush.

Source: the change record [node/3512518](https://www.drupal.org/node/3512518), imported as the guide `new-blockplugininterface-createplaceholder-method`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_stats exists in web/modules/custom/bench_stats and is enabled. |
| `count` | MUST | Outcome | With two published nodes and one unpublished node, the block renders "Published content: 2" and carries the node_list cache tag. |
| `placeholder` | MUST | Practice | The block plugin's createPlaceholder() returns TRUE. |
| `view-builder` | MUST | Outcome | Building a placed instance through the block view builder yields a #create_placeholder render array. |
| `cacheable` | MUST | Outcome | The block's max-age is not 0. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
