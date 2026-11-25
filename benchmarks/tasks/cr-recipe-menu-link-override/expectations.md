# Expectations: Recipe that hides a code-defined menu link

Checks parse the recipe file and read the active configuration after it was applied. The menu link check runs through Drush.

Source: the change record [node/3570506](https://www.drupal.org/node/3570506), imported as the guide `new-config-action-to-override-static-menu-links`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `recipe` | MUST | Outcome | recipes/bench_no_myaccount/recipe.yml exists and has a name. |
| `action` | MUST | Practice | The recipe uses overrideMenuLinks on core.menu.static_menu_link_overrides for user.page. |
| `applied` | MUST | Outcome | The menu link manager reports user.page disabled and user.logout at weight 50. |
| `no-config-copy` | MUST NOT | Practice | The recipe ships core.menu.static_menu_link_overrides.yml in its config folder. |
