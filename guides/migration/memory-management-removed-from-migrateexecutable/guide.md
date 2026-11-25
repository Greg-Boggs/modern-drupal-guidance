---
name: memory-management-removed-from-migrateexecutable
title: "Memory management removed from MigrateExecutable"
description: "Memory management removed from MigrateExecutable"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3139212
change-record-nid: 3139212
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3006750](https://www.drupal.org/node/3006750)

Migrate has a long history of reclaiming memory via PHP garbage collection. As entities get added, this memory reclamation gets kicked off.

Since [https://www.drupal.org/project/drupal/issues/3498154](https://www.drupal.org/project/drupal/issues/3498154) the static entity cache is now implemented using an LRU memory cache, which cycles items out of memory when it gets full. This signficantly improves the memory usage of long-running migrations without requiring migrate's own memory management to run at all. Therefore the memory management logic in MigrateExecutable has been removed.

If sites are on hosting with a very low memory limit, it is possible to manually tweak the number of slots in the entity memory LRU cache, so that maximum PHP memory usage stays at a lower level. See [https://www.drupal.org/node/3512407](https://www.drupal.org/node/3512407)

*Source: [Memory management removed from MigrateExecutable](https://www.drupal.org/node/3139212), a Drupal core change record by [heddn](https://www.drupal.org/user/1463982) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
