# Expectations: Front page set by URL alias

Checks read active configuration and the content manifest and fetch / over HTTP.

Source: the change record [node/3572707](https://www.drupal.org/node/3572707), imported as the guide `site-information-form-now-stores-unresolved-path-aliases`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `config-alias` | MUST | Outcome | system.site page.front is "/welcome". |
| `node` | MUST | Outcome | A published Basic page "Welcome" exists. |
| `front-renders` | MUST | Outcome | GET / returns 200 with "Hello from the welcome page." and no redirect to /welcome. |
