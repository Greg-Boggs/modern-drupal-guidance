# Expectations: Recipe that renames a content type

Checks parse the recipe file and read the active configuration after it was applied.

Source: the change record [node/3515543](https://www.drupal.org/node/3515543), imported as the guide `new-config-action-called-setproperties-for-use-on`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `recipe` | MUST | Outcome | recipes/bench_story/recipe.yml exists and has a name. |
| `set-properties` | MUST | Practice | The recipe uses setProperties on node.type.article. |
| `no-simple-config` | MUST NOT | Practice | The recipe uses simpleConfigUpdate on node.type.article. |
| `applied` | MUST | Outcome | node.type.article has name "Story" and description "Short stories from our writers." |
