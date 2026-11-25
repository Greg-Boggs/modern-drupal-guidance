# Expectations: Latest articles block with precise cache invalidation

Checks build and render the block plugin through Drush with test nodes and read its cache metadata.

Source: the change record [node/3512328](https://www.drupal.org/node/3512328), imported as the guide `new-entitytype-getbundlelistcachetags-method`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_latest exists in web/modules/custom/bench_latest and is enabled. |
| `lists-articles` | MUST | Outcome | With four articles and one newer page, the block shows the three newest article titles and not the oldest article or the page. |
| `bundle-tag` | MUST | Outcome | The block's cache tags include node_list:article. |
| `no-global-list-tag` | MUST | Outcome | The block's cache tags do not include the global node_list tag, so page edits do not invalidate it. |
| `no-hand-built-tag` | MUST NOT | Practice | The module does not build a "<type>_list:<bundle>" cache tag string by hand. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
