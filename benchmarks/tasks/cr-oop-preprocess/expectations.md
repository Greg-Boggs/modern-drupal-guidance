# Expectations: Node preprocessing in a hook class

Checks create a node through Drush and fetch it over HTTP.

Source: the change record [node/3496491](https://www.drupal.org/node/3496491), imported as the guide `preprocess-functions-in-modules-now-support-object-oriented`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_wordcount exists in web/modules/custom/bench_wordcount and is enabled. |
| `attribute` | MUST | Outcome | GET /node/N for a page titled "Three little words" has an <article> with data-words="3". |
| `no-procedural-preprocess` | MUST NOT | Practice | The module defines no bench_wordcount_preprocess_node() function and has no .module file. |
| `no-module-file` | MUST NOT | Practice | web/modules/custom/bench_wordcount/bench_wordcount.module exists. |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
