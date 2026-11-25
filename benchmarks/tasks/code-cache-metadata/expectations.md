# Expectations: Cached published-article counter block

Checks fetch the front page as an anonymous visitor while the grader adds and unpublishes articles through Drush (no cache clears in between), render the plugin through Drush to read its bubbled cache metadata, and run the `cache-metadata` legacy-scan rules.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | `web/modules/custom/bench_cache/bench_cache.info.yml` exists and the module is enabled. |
| `placed` | MUST | Outcome | An enabled `block.block.*` config places `bench_article_count` in Olivero's `sidebar` region. |
| `initial` | MUST | Outcome | The front page shows "Published articles: 0", and a second request is a page cache hit (`X-Drupal-Cache: HIT`). |
| `updates-on-publish` | MUST | Outcome | After an article is created, the front page shows "Published articles: 1". |
| `updates-on-unpublish` | MUST | Outcome | After that article is unpublished, the front page shows "Published articles: 0". |
| `cache-tags` | MUST | Practice | The block's cache metadata includes the `node_list` or `node_list:article` cache tag. |
| `not-uncacheable` | MUST NOT | Outcome | The block's cache max-age is 0, or the module calls the `page_cache_kill_switch` service. |
| `no-legacy-pattern` | MUST NOT | Practice | The `cache-metadata` legacy-scan rules find a render array without the cache metadata it needs. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses an API that `data/drupal/deprecations.json` lists as deprecated or removed. |
