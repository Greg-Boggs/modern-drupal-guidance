# Expectations: Recipe that configures every content type

Checks parse the recipe file and read the active configuration after it was applied.

Source: the change record [node/3481714](https://www.drupal.org/node/3481714), imported as the guide `new-config-action-that-can-create-entities-for-each-node`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `recipe` | MUST | Outcome | recipes/bench_lang_all/recipe.yml exists and has a name. |
| `for-each` | MUST | Practice | The recipe has a node.type.* action entry using createForEach or createForEachIfNotExists for language.content_settings.node.%bundle. |
| `no-bundle-names` | MUST NOT | Outcome | The recipe names language.content_settings.node.article or .page explicitly. |
| `applied` | MUST | Outcome | language is enabled and language.content_settings.node.article and .page exist with language_alterable true. |
