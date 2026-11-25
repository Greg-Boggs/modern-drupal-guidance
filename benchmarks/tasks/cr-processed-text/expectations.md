# Expectations: Filter text into a cacheable render array

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3588040](https://www.drupal.org/node/3588040), imported as the guide `the-check-markup-function-is-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_text exists in web/modules/custom/bench_text and is enabled. |
| `filters` | MUST | Outcome | Rendering format() of "<p><strong>Hi</strong><script>x()</script></p>" keeps <strong>, drops <script>, and carries the config:filter.format.basic_html cache tag. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call check_markup(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
