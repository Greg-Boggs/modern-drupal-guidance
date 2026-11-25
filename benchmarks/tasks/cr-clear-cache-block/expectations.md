# Expectations: One-click cache clearing for editors

Checks read active configuration and render the placed block through Drush.

Source: the change record [node/3414904](https://www.drupal.org/node/3414904), imported as the guide `new-clear-cache-block-added`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `placed` | MUST | Outcome | A block using core's clear cache block plugin (system_clear_cache_block) is enabled in Claro's content region. |
| `renders` | MUST | Outcome | Rendering the placed block for user 1 produces a form with a button. |
| `no-custom-module` | MUST NOT | Outcome | No custom module or theme code was written for it. |
