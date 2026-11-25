# Expectations: Recipe that turns on Layout Builder for articles

Checks parse the recipe file and read the active configuration after it was applied.

Source: the change record [node/3487747](https://www.drupal.org/node/3487747), imported as the guide `recipes-can-enable-disable-layout-builder-and-layout`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `recipe` | MUST | Outcome | recipes/bench_article_layouts/recipe.yml exists and has a name. |
| `actions` | MUST | Practice | The recipe uses enableLayoutBuilder and allowLayoutOverrides: true on core.entity_view_display.node.article.default. |
| `applied` | MUST | Outcome | The active article default display has layout_builder enabled and allow_custom true, and the layout_builder__layout field exists on articles. |
| `no-simple-update` | MUST NOT | Practice | The recipe sets third_party_settings.layout_builder with simpleConfigUpdate or setProperties. |
