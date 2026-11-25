# Expectations: Controller that adds markup to the top of the page

Checks fetch the page over HTTP.

Source: the change record [node/3558616](https://www.drupal.org/node/3558616), imported as the guide `page-top-and-page-bottom-can-now-be-added-using-attachments`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_banner exists in web/modules/custom/bench_banner and is enabled. |
| `page-top` | MUST | Outcome | GET /bench-banner shows the notice before the theme's page markup (its first <header> element) and before the main content. |
| `only-there` | MUST | Outcome | GET /user/login does not show the notice. |
| `no-page-hooks` | MUST NOT | Practice | The module implements no page_top, page_bottom or page_attachments hook. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
