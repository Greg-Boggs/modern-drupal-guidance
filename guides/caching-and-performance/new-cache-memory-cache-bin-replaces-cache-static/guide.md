---
name: new-cache-memory-cache-bin-replaces-cache-static
title: "New cache.memory cache bin, replaces cache.static, MemoryCacheInterface alias deprecated"
description: "New cache.memory cache bin, replaces cache.static, MemoryCacheInterface alias deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3546856
change-record-nid: 3546856
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3047289](https://www.drupal.org/node/3047289)

`cache.memory` is a standardized memory cache bin that can be used to store data in memory, for example as part of a backendchain combined with a persistent cache bin or as an alternative to storing data in a property.

It is backed by the \Drupal\Core\Cache\MemoryCache\MemoryCache backend, which does not serialize data between requests and is therefore faster to use. It does however support in-request cache tag invalidations, which allows to have cached data automatically invalidated when cached in the same request. Cache tag invalidations that happen in separate requests will not affect cache items stored in this bin.

The existing cache bin cache.static is deprecated. It is backed by the \Drupal\Core\Cache\MemoryBackend, which serializes and deserializes cached data to avoid changing it by reference. It is designed to be a drop-in replacement for a persistent cache in Unit or Kernel tests and should not be used for regular runtime operations. The `cache.backend.memory` cache backend is also deprecated. Update cache configurations, either default_backend in a cache bin service or in $settings.php, to use `cache.backend.memory.memory` instead.

The `Drupal\Core\Cache\MemoryCache\MemoryCacheInterface` service is also deprecated, it was incorrectly defined as an alias for the `entity.memory_cache` which should only be used by entity storages to store loaded entities in memory. If your service relied on Autowire to have this cache bin injected, use an `#Autowire` attribute instead.

Before:

```php
public function __contruct(
  MemoryCacheInterface $cache
) {};
```

After:

```php
public function __construct(
  #[Autowire('cache.memory')]
  CacheBackendInterface $cache
) {};
```

Note: As with other generic cache bins, this is shared across all usages, ensure that unique keys are used by prefixing them with the module, class or similar unique prefixes.

*Source: [New cache.memory cache bin, replaces cache.static, MemoryCacheInterface alias deprecated](https://www.drupal.org/node/3546856), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
