---
name: cachebackendinterface-invalidateall-is-deprecated
title: "CacheBackendInterface::invalidateAll() is deprecated"
description: "CacheBackendInterface::invalidateAll() is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3500622
change-record-nid: 3500622
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3498947](https://www.drupal.org/node/3498947)

It is possible to delete a cache and it is possible to invalidate a cache. If you delete it, the deleted cache items cease to exist. That means the item cannot be rendered from the cache under any circumstances.

Whereas if you invalidate data you do not destroy it; you mark it as stale, or, one might say, 'past its sell by date.' When you mark a cached item as invalid, the mark can in fact be ignored by setting $allow_invalid to TRUE.

It is like an item left on the supermarket shelf that is marked 'past its sell by date' but that is still available for purchase. Whereas deletion is equivalent to incinerating the item.

The default database implementation of cache invalidation handles it by marking all cache items as expiring in the past. Alternative cache implementation like Redis and Memcache need to separately track delete all vs invalidate all. Redis does that with an additional cache tag per bin. This makes this relatively expensive for cache bins/items that otherwise do not use cache tags.

invalidateAll() has no known use case compared to deleteAll() and is deprecated.

Note: Instead of invalidating/deleting the render cache bin, it is recommended to invalidate the deleted cache tag, as that also covers additional cache bins such as page cache and dynamic page cache.

**Before:**

```php
// Invalidate a whole cache bin.
\Drupal::cache('menu')->invalidateAll();
```

**After:**

```php
// Delete everything in a whole cache bin.
\Drupal::cache('menu')->deleteAll();

// Invalidate all cached rendered elements, including page and dynamic page caches.
\Drupal::service('cache_tags.invalidator')->invalidateTags(['rendered']);
```

*Source: [CacheBackendInterface::invalidateAll() is deprecated](https://www.drupal.org/node/3500622), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
