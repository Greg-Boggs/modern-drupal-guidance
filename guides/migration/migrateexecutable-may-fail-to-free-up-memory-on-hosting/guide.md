---
name: migrateexecutable-may-fail-to-free-up-memory-on-hosting
title: "MigrateExecutable may fail to free up memory on hosting that has a low memory limit due to new entity LRU cache, causing more batches to run"
description: "MigrateExecutable may fail to free up memory on hosting that has a low memory limit due to new entity LRU cache, causing more batches to run"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3512407
change-record-nid: 3512407
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3498154](https://www.drupal.org/node/3498154)

The `entity.memory_cache` service used by the entity storage handlers to store loaded entities in memory has changed to a LRU (least recently used) cache.

By default, this cache keeps up to 1,000 entities in memory and then makes room for more by removing the least recently used entity from memory. We estimate that 1,000 entities will equate to roughly 200MB of memory.

#### Migrations

Sites running migrations on some (free) hosting plans with a memory limit of, say, 128MB may now get the following error.

> Memory usage is now @usage (@pct% of limit @limit), not enough reclaimed, starting new batch

This is because the memory is no longer manually freed up whenever we do a memory usage check.

We recommend lowering the number of `entity.memory_cache.slots`. This limit is set using the `entity.memory_cache.slots` container parameter in core.services.yml.

`entity.memory_cache.slots: 1000`

*Source: [MigrateExecutable may fail to free up memory on hosting that has a low memory limit due to new entity LRU cache, causing more batches to run](https://www.drupal.org/node/3512407), a Drupal core change record by [kristiaanvandeneynde](https://www.drupal.org/user/1345130) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
