---
name: views-cachepluginbase-getrowcachekeys-deprecated-row-level
title: "Views CachePluginBase::getRowCacheKeys() deprecated, row-level caching removed"
description: "Views CachePluginBase::getRowCacheKeys() deprecated, row-level caching removed"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3564958
change-record-nid: 3564958
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3564937](https://www.drupal.org/node/3564937)

1. `CachePluginBase::getRowCacheKeys()` has been deprecated for removal in Drupal 13.0.0 without replacement.
2. `::getRowCacheKeys()` will not be called on views cache plugins from 11.4.0 onwards.

The individual rows of a view are usually cheap to render, and the row caching resulted in a large number of cache entries with low cache hit rates.

#### Before

Views cached the result of individual result rows in the render cache.

#### After

Views does not cache the result of individual result rows in the render cache. Views render output is still cached at the level of the display.

*Source: [Views CachePluginBase::getRowCacheKeys() deprecated, row-level caching removed](https://www.drupal.org/node/3564958), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
