# Expectations: Badge behavior that runs once per element

Checks read the library definition through Drush, fetch an article page as an anonymous visitor, and run the page's behaviors in a lightweight DOM (linkedom, no browser): core's `drupal.js`, `drupalSettingsLoader.js`, `once` and jQuery when the page loads them, plus scripts from `web/modules/custom/`. They also run the `core-once-behaviors` legacy-scan rules.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | `web/modules/custom/bench_js/bench_js.info.yml` exists and the module is enabled. |
| `library` | MUST | Practice | The module defines a library that depends on `core/once` and `core/drupal`. |
| `attached` | MUST | Outcome | An article page loads a script from `modules/custom/bench_js/`. |
| `once-per-element` | MUST | Outcome | After `Drupal.attachBehaviors(document)` runs twice, every `.node__content` holds exactly one `span.bench-badge` with the text "New". |
| `ajax-content` | MUST | Outcome | A `.node__content` element added later gets exactly one badge when behaviors are attached to its new container, and existing elements still have one. |
| `no-legacy-pattern` | MUST NOT | Practice | The `core-once-behaviors` legacy-scan rules find `jQuery.once()` or the removed `core/jquery.once` library. |
| `no-document-ready` | MUST NOT | Practice | The module's JavaScript uses `$(document).ready`, `jQuery(document).ready`, `$(function` or a `DOMContentLoaded` listener. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses an API or library that `data/drupal/deprecations.json` lists as deprecated or removed. |
