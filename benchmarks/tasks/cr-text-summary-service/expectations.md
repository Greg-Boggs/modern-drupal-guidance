# Expectations: Generate text summaries

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3568389](https://www.drupal.org/node/3568389), imported as the guide `text-summary-is-deprecated-and-moved-to-new-textsummary`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_summary exists in web/modules/custom/bench_summary and is enabled. |
| `summary` | MUST | Outcome | summarize() returns the same string as core's TextSummary service for two inputs. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call text_summary(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
