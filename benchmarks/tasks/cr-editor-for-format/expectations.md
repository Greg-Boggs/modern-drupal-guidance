# Expectations: Look up the editor of a text format

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3509245](https://www.drupal.org/node/3509245), imported as the guide `editor-load-is-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_editorinfo exists in web/modules/custom/bench_editorinfo and is enabled. |
| `lookup` | MUST | Outcome | editorFor('basic_html') is "ckeditor5" and editorFor('plain_text') is NULL. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call editor_load(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
