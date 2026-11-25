# Expectations: Skip one child when rendering a render array

Checks build and render the array through Drush.

Source: the change record [node/3261271](https://www.drupal.org/node/3261271), imported as the guide `render-control-functions-hide-and-show-are-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_hidden exists in web/modules/custom/bench_hidden and is enabled. |
| `hidden` | MUST | Outcome | build(FALSE) keeps the secret child in the array and renders "Welcome." and "Goodbye." but not "Staff only." |
| `shown` | MUST | Outcome | build(TRUE) renders all three texts. |
| `no-access-change` | MUST | Outcome | build(FALSE) does not set #access on the secret child. |
| `no-hide-show` | MUST NOT | Practice | The module does not call hide() or show(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
