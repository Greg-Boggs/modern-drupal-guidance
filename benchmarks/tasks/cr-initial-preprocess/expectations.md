# Expectations: Theme hook with a preprocess callback on a hook class

Checks render the theme hook and read the theme registry through Drush.

Source: the change record [node/3504125](https://www.drupal.org/node/3504125), imported as the guide `template-preprocess-hook-are-defined-as-callbacks-in-the`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_badge exists in web/modules/custom/bench_badge and is enabled. |
| `renders` | MUST | Outcome | Rendering #theme bench_badge with label "New" and color red outputs <span class="badge badge--red">New</span>. |
| `initial-preprocess` | MUST | Practice | The theme registry entry for bench_badge has an "initial preprocess" callback. |
| `no-template-preprocess-function` | MUST NOT | Practice | The module defines no template_preprocess_bench_badge() function. |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
