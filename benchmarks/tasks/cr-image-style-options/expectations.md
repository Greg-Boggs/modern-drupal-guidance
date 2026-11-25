# Expectations: List image styles for a select element

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3567619](https://www.drupal.org/node/3567619), imported as the guide `image-path-flush-image-style-options-and-image-derivative`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_styles exists in web/modules/custom/bench_styles and is enabled. |
| `options` | MUST | Outcome | options(TRUE) and options(FALSE) equal core's ImageDerivativeUtilities::styleOptions() and include thumbnail. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call image_style_options() or image_path_flush() or use IMAGE_DERIVATIVE_TOKEN. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
