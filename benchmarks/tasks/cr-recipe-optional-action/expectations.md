# Expectations: Recipe actions that tolerate missing blocks

Checks parse the recipe file and read the active configuration after it was applied.

Source: the change record [node/3552215](https://www.drupal.org/node/3552215), imported as the guide `config-actions-can-now-be-skipped-if-the-entity-does-not`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `recipe` | MUST | Outcome | recipes/bench_quiet_footer/recipe.yml exists and has a name. |
| `optional-key` | MUST | Practice | The recipe has an action entry for ?block.block.bench_promo (skip if missing). |
| `applied` | MUST | Outcome | block.block.olivero_powered is disabled and no bench_promo block was created. |
