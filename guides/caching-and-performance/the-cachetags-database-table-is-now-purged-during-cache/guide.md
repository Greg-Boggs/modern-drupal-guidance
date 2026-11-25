---
name: the-cachetags-database-table-is-now-purged-during-cache
title: "The 'cachetags' database table is now purged during cache rebuild"
description: "The 'cachetags' database table is now purged during cache rebuild"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3522219
change-record-nid: 3522219
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3097393](https://www.drupal.org/node/3097393)

The 'cachetags' database table is now purged during cache rebuild. This happens within a call to drupal_flush_all_caches(), immediately after the cache bins are emptied.

This is done by having the `cache_tags.invalidator` and `cache_tags.invalidator.checksum` services implement a new interface `Drupal\Core\Cache\CacheTagsPurgeInterface` and its `purge()` method.

If alternative implementations of the cache tag checksum service also need to explicitly purge their data, they can implement this interface.

Previously, the 'cachetags' table could grow endlessly and could get large if there were a large number of cache tags being invalidated.

*Source: [The 'cachetags' database table is now purged during cache rebuild](https://www.drupal.org/node/3522219), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
