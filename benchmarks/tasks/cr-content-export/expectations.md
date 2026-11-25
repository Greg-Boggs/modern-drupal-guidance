# Expectations: Export a page as recipe default content

Checks parse the recipe and the exported default content files.

Source: the change record [node/3533854](https://www.drupal.org/node/3533854), imported as the guide `content-export-command-added-to-help-with-recipe-development`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `recipe` | MUST | Outcome | recipes/bench_about/recipe.yml exists and is named "Bench about". |
| `exported` | MUST | Outcome | recipes/bench_about/content/ holds a YAML file in core's default content format (_meta with entity_type node, bundle page and a uuid) for "About us". |
| `filename-uuid` | MUST | Practice | The file is in content/node/ and named after the node's UUID, as core's content exporter writes it. |
| `body` | MUST | Outcome | The exported body contains "We build websites." |
