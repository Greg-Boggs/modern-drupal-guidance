# Expectations: Read theme settings from a service

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3035289](https://www.drupal.org/node/3035289), imported as the guide `theme-get-setting-is-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_themeset exists in web/modules/custom/bench_themeset and is enabled. |
| `settings` | MUST | Outcome | setting() matches core's ThemeSettingsProvider for olivero and claro, including a value changed in olivero.settings. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call theme_get_setting(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
