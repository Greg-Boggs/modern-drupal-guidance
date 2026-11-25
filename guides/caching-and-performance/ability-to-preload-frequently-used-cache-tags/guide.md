---
name: ability-to-preload-frequently-used-cache-tags
title: "Ability to preload frequently used cache tags"
description: "Ability to preload frequently used cache tags"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3505248
change-record-nid: 3505248
introduced-in-version: "11.2.x"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.x\
Issue links: [#3436146](https://www.drupal.org/node/3436146), [#3505059](https://www.drupal.org/node/3505059)

Cache tags of fetched cache entries need to be verified to ensure that they are still valid. The implementation for cache tag validation is quite optimized with a static cache and support for checking multiple cache tags at once, but still, each cache item that contains at least one not-yet-seen cache tag for the current request results in an additional lookup.

A new ability to register cache tags for preloading allows to define that certain cache tags are used on most pages and should be loaded upfront with the first cache tag, this can significantly reduce the amount of lookups necessary on pages with warm render caches.

Cache tag checksum implementations can now implement the new interface `\Drupal\Core\Cache\CacheTagsChecksumPreloadInterface` which defines the method `registerCacheTagsForPreload`method. This method is already implemented in the recommended `\Drupal\Core\Cache\CacheTagsChecksumTrait`, no further change is required when using relying on that trait.

The new `\Drupal\Core\Cache\EventSubscriber\CacheTagPreloadSubscriber` automatically registers the following cache tags on all request for preloading:

```php
[
  'route_match',
  'access_policies',
  'routes',
  'router',
  'entity_types',
  'entity_field_info',
  'entity_bundles',
  'local_task',
  'library_info',
]
```

Modules and sites may either implement their own code to register more cache tags or use the included setting:

```php
$settings['cache_preload_tags'] = ['additional_cache_tag'];
```

The target audience for further optimizations are sites with a large amount of requests as well as sites using multiple servers where the cost of cache lookups tends to be higher.

Good targets for such preloading are tags that are often used and allow to eliminate entire lookups, as shown in following assertions for the StandardPerformanceTest request:

```php
-      'CacheTagLookupQueryCount' => 29,
+      'CacheTagLookupQueryCount' => 22,
       'CacheTagGroupedLookups' => [
-        ['route_match'],
-        ['entity_types'],
-        ['routes'],
+        ['route_match', 'access_policies', 'routes', 'router', 'entity_types', 'entity_field_info', 'entity_bundles', 'local_task', 'library_info'],
         ['config:views.view.frontpage'],
         ['config:core.extension', 'views_data'],
-        ['entity_field_info'],
-        ['entity_bundles'],
-        ['node_values'],
         ['node:1', 'node_list'],
-        ['user_values'],
         ['rendered', 'user:0', 'user_view'],
         ['config:filter.format.restricted_html', 'node_view'],
         ['block_view', 'config:block.block.stark_site_branding', 'config:system.site'],
@@ -167,14 +162,12 @@ protected function testAnonymous(): void {
         ['config:block.block.stark_breadcrumbs'],
         ['config:block.block.stark_primary_admin_actions'],
         ['config:block.block.stark_messages'],
-        ['local_task'],
         ['config:block.block.stark_primary_local_tasks'],
         ['config:block.block.stark_secondary_local_tasks'],
         ['config:block.block.stark_help'],
         ['config:block.block.stark_powered'],
         ['config:block.block.stark_syndicate'],
         ['config:block.block.stark_content', 'config:block.block.stark_page_title', 'config:block_list', 'http_response'],
-        ['library_info'],
         ['config:user.role.anonymous'],
       ],
```

In this scenario, sites that frequently use views might want to add `['config:core.extension', 'views_data']`, but there is little benefit to adding rendered or user_view as it is combined with many different user ids and a query is then still necessary.

Additional notes:

- The default preloading mechanisms may be further improved in the future
- Note that invalidated page caches and dynamic page caches automatically act as cache tag preloaders for the rest of the page as well as their cache tags are validated, as shown in [#3504516: Add node:list cache invalidation performance test](https://www.drupal.org/project/drupal/issues/3504516)
- entity_type_values cache tags have been removed in [#3505059: Remove entity_type_values cache tags](https://www.drupal.org/project/drupal/issues/3505059), see [https://www.drupal.org/node/3505638](https://www.drupal.org/node/3505638)
- It is recommended to use this sparingly as each cache tag that is loaded results in a minimal overhead

When using Redis, cache tag lookups can be investigated using `redis-cli MONITOR | grep :cachetags:`, otherwise a debugger or profiling tool can be used.

*Source: [Ability to preload frequently used cache tags](https://www.drupal.org/node/3505248), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
