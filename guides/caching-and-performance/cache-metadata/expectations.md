# Expectations

- Each render array the task builds from an entity carries that entity's cache tag (for example `node:<id>`), added through `CacheableMetadata::addCacheableDependency()`, `RendererInterface::addCacheableDependency()` or an explicit `#cache` `tags` entry.
- Each render array built from a config object carries that object's `config:<name>` cache tag.
- Output that lists or counts entities of a type carries the `<entity_type>_list` tag, or the `<entity_type>_list:<bundle>` tag when it is limited to one bundle.
- Output whose content depends on the current user's permissions carries the `user.permissions` cache context.
- Output that does not differ per individual user does not carry the `user` cache context.
- Output that depends on a query string parameter carries `url.query_args:<name>` for that parameter.
- No render array, block or response the task adds sets `max-age` to `0`.
- A block plugin that overrides `getCacheTags()`, `getCacheContexts()` or `getCacheMaxAge()` merges with the parent's values (for example with `Cache::mergeTags()` or `Cache::mergeContexts()`).
- An access check the task adds returns an `AccessResult` that carries the cacheability of what it depends on (for example `allowedIfHasPermission()` or `addCacheableDependency()`).
- A controller that returns JSON or another non-render-array response returns a `CacheableJsonResponse` or `CacheableResponse` with cacheable dependencies attached.
- With `http.response.debug_cacheability_headers` enabled, the response for the task's page lists the expected tags in `X-Drupal-Cache-Tags` and the expected contexts in `X-Drupal-Cache-Contexts`.
- The task's page responds with `X-Drupal-Cache-Max-Age: -1 (Permanent)` unless the task requires time-based expiry.
- After saving an entity the page depends on, the next anonymous request for the page reflects the change.
- Code that changes custom data the output depends on invalidates the custom cache tag through `CacheTagsInvalidatorInterface::invalidateTags()` or `Cache::invalidateTags()`, and does not call `drupal_flush_all_caches()`.
