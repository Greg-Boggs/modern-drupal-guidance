# Expectations: Recipe that reads the slogan from the environment

Checks parse the recipe file and read the active configuration after it was applied.

Source: the change record [node/3524496](https://www.drupal.org/node/3524496), imported as the guide `recipe-input-now-accepts-environment-variables`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `recipe` | MUST | Outcome | recipes/bench_slogan/recipe.yml exists and has a name. |
| `env-input` | MUST | Outcome | The slogan input defaults to source env with env BENCH_SLOGAN and fallback "Made with Drupal". |
| `applied` | MUST | Outcome | The active site slogan is "Built with recipes". |
