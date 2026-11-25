# Expectations: Let Twig call a value object's method

Checks render an inline Twig template through Drush.

Source: the change record [node/3551699](https://www.drupal.org/node/3551699), imported as the guide `new-twigallowed-method-attribute`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_tw exists in web/modules/custom/bench_tw and is enabled. |
| `twig-call` | MUST | Outcome | An inline template "{{ badge.shout() }}" with new Badge('new') renders "NEW!". |
| `no-sandbox-change` | MUST NOT | Outcome | The module changes twig.config, the sandbox policy or the allowed method settings. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
