# Expectations: Recipe that adds a link to the admin navigation

Checks parse the recipe file and read the active configuration after it was applied.

Source: the change record [node/3490147](https://www.drupal.org/node/3490147), imported as the guide `new-config-action-to-add-blocks-to-navigation`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `recipe` | MUST | Outcome | recipes/bench_nav_docs/recipe.yml exists and has a name. |
| `action` | MUST | Practice | The recipe uses the addNavigationBlock action on navigation.block_layout. |
| `applied` | MUST | Outcome | The active navigation.block_layout has a navigation_link component with uri https://www.drupal.org/docs and title "Drupal docs", and still has the Content menu block. |
| `no-config-copy` | MUST NOT | Practice | The recipe ships navigation.block_layout.yml in its config folder. |
