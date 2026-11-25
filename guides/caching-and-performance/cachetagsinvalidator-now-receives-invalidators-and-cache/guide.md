---
name: cachetagsinvalidator-now-receives-invalidators-and-cache
title: "CacheTagsInvalidator now receives invalidators and cache bins as tagged iterators"
description: "CacheTagsInvalidator now receives invalidators and cache bins as tagged iterators"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3636941
change-record-nid: 3636941
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3622391](https://www.drupal.org/node/3622391)

The `cache_tags.invalidator` service no longer uses service collectors to gather cache tag invalidators and cache bins. They are now passed to the constructor as tagged iterators, so services are only initialised when `invalidateTags()` is called. This avoids circular references during container build and stops every cache bin being loaded early.

`CacheTagsInvalidator::__construct()` now takes three arguments:

```php
public function __construct(
  protected iterable $invalidators = [],
  protected iterable $bins = [],
  protected iterable $memoryBins = [],
)
```

The `$invalidators` and `$bins` properties are now typed `iterable`. The bin iterators can contain cache bins that don't implement CacheTagsInvalidatorInterface, and these are skipped when tags are invalidated.

The `addInvalidator()` and `addBin()` methods will continue to work.

If you extend CacheTagsInvalidator and override the constructor, call the parent constructor with the tagged iterators. If you replace the `cache_tags.invalidator` service definition, pass the same arguments:

```php
cache_tags.invalidator:
  class: Drupal\Core\Cache\CacheTagsInvalidator
  arguments: [!tagged_iterator cache_tags_invalidator, !tagged_iterator cache.bin, !tagged_iterator cache.bin.memory]
```

Services tagged with `cache_tags_invalidator`, `cache.bin` or `cache.bin.memory` don't need to change.

*Source: [CacheTagsInvalidator now receives invalidators and cache bins as tagged iterators](https://www.drupal.org/node/3636941), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
