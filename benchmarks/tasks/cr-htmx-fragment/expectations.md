# Expectations: Swap in a fragment with core's declarative AJAX

Checks fetch the page and the fragment route over HTTP, with and without an HX-Request header.

Source: the change record [node/3539472](https://www.drupal.org/node/3539472), imported as the guide `ajax-subsystem-now-includes-htmx`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_quote exists in web/modules/custom/bench_quote and is enabled. |
| `page` | MUST | Outcome | GET /bench-quote returns 200 with the #bench-quote box and a "Next quote" button. |
| `htmx-attributes` | MUST | Practice | The button is wired declaratively with core's htmx attributes: (data-)hx-get points to /bench-quote/next and (data-)hx-target is #bench-quote. |
| `library` | MUST | Practice | The page loads core's htmx library and its Drupal integration (htmx.min.js and htmx-behaviors.js). |
| `fragment` | MUST | Outcome | GET /bench-quote/next, with or without an HX-Request header, returns the quote without the theme's page regions (no <header or <footer element). |
| `no-custom-js` | MUST NOT | Outcome | The module ships no JavaScript of its own. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
