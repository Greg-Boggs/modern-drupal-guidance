---
name: contententitystoragebase-latestrevisionids-has-been-removed
title: "ContentEntityStorageBase::latestRevisionIds has been removed"
description: "ContentEntityStorageBase::latestRevisionIds has been removed"
drupal-core: ">=11.2.6"
source-url: https://www.drupal.org/node/3535160
change-record-nid: 3535160
introduced-in-version: "11.2.6"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.6\
Issue links: [#3532741](https://www.drupal.org/node/3532741)

The protected `latestRevisionIds` variable from the `\Drupal\Core\Entity\ContentEntityStorageBase` class has been removed in favor of storing the latest revision IDs in the `entity.memory_cache` service.

*Source: [ContentEntityStorageBase::latestRevisionIds has been removed](https://www.drupal.org/node/3535160), a Drupal core change record by [amateescu](https://www.drupal.org/user/729614) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
