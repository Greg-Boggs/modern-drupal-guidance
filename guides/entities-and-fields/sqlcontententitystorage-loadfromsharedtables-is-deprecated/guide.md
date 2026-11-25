---
name: sqlcontententitystorage-loadfromsharedtables-is-deprecated
title: "SqlContentEntityStorage::loadFromSharedTables() is deprecated"
description: "SqlContentEntityStorage::loadFromSharedTables() is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3586362
change-record-nid: 3586362
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3561960](https://www.drupal.org/node/3561960)

The protected method `SqlContentEntityStorage::loadFromSharedTables()` is deprecated without replacement. Its logic has been consolidated into `SqlContentEntityStorage::loadFromDedicatedTables()`

Contributed or custom code that is subclassing `SqlContentEntityStorage` will need reviewing to see whether it needs to be updated, however it is very unusual to customise this logic.

*Source: [SqlContentEntityStorage::loadFromSharedTables() is deprecated](https://www.drupal.org/node/3586362), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
