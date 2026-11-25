---
name: entity-queries-for-latest-revision-now-return-the-latest
title: "Entity queries for latest revision now return the latest workspace-specific revision"
description: "Entity queries for latest revision now return the latest workspace-specific revision"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3064221
change-record-nid: 3064221
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3045177](https://www.drupal.org/node/3045177)

Entity queries that are looking for latest revisions of an entity type (by using `\Drupal\Core\Entity\Query\QueryInterface::latestRevision()`), are now returning the latest workspace-specific revision when running in a workspace context, for example in the `stage` workspace.

*Source: [Entity queries for latest revision now return the latest workspace-specific revision](https://www.drupal.org/node/3064221), a Drupal core change record by [amateescu](https://www.drupal.org/user/729614) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
