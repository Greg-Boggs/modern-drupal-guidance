---
name: memorybackend-garbagecollection-now-removes-invalid-items
title: "MemoryBackend::garbageCollection() now removes invalid items from memory"
description: "MemoryBackend::garbageCollection() now removes invalid items from memory"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3559908
change-record-nid: 3559908
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3480025](https://www.drupal.org/node/3480025)

Executing `MemoryBackend::garbageCollection()` will properly clear invalidated items, freeing up memory.

Previously, invalidating items in the `MemoryBackend` cache would not result in their removal. This could lead to situations where the size of the cache in RAM would grow without a means to clear it. It happened because `MemoryBackend::garbageCollection()` was an empty function.

*Source: [MemoryBackend::garbageCollection() now removes invalid items from memory](https://www.drupal.org/node/3559908), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
