# Expectations: Button template with class variants

Checks render the theme hook through Drush and read the template.

Source: the change record [node/3581193](https://www.drupal.org/node/3581193), imported as the guide `class-variance-authority-cva-support-added-to-twig`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_button exists in web/modules/custom/bench_button and is enabled. |
| `danger-lg` | MUST | Outcome | Rendering intent danger, size lg gives a button with classes btn, btn--danger and btn--lg and the label. |
| `defaults` | MUST | Outcome | Rendering with no intent or size gives btn, btn--primary and btn--sm. |
| `uses-cva` | MUST | Practice | The module's Twig template calls html_cva(). |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
