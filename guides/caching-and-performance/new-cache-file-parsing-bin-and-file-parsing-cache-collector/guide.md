---
name: new-cache-file-parsing-bin-and-file-parsing-cache-collector
title: "New cache.file_parsing bin and file parsing cache collector"
description: "New cache.file_parsing bin and file parsing cache collector"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3593451
change-record-nid: 3593451
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3486503](https://www.drupal.org/node/3486503)

A new `cache.file_parsing` cache bin has been added, for persistent caching of the result of file parsing. This bin does not have the `cache.bin` service tag so that it persists across cache clears (whether via drush, the UI or programmatic calls to drupal_flush_all_caches(). However the bin can be manually cleared if necessary using the `CacheBackendInterface::deleteAll()`.

The bin is designed to be used with implementations of the new `Drupal\Core\Utility\FileParsingCacheCollectorBase` which supports validation of individual file entries via mtime checks.

This can be used as a replacement of the existing FileCache system which implements similar logic but with APCu as a storage backend. By using a persistent cache instead of APCu, the cache state will always be consistent across cli and between multiple web servers, which should improve response times both for local development which often involves frequent cache clears via the cli, and on production sites immediately after a full cache clear such as via deployments.

There is also a `YamlCacheCollector` class, which is used for asset library parsing (`libraries.yml`) and route parsing (`routing.yml`).

More implementations may be added to core in further issues.

*Source: [New cache.file_parsing bin and file parsing cache collector](https://www.drupal.org/node/3593451), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
