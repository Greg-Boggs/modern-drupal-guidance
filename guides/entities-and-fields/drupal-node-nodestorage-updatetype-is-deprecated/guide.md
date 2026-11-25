---
name: drupal-node-nodestorage-updatetype-is-deprecated
title: "\\Drupal\\node\\NodeStorage::updateType is deprecated"
description: "\\Drupal\\node\\NodeStorage::updateType is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3515214
change-record-nid: 3515214
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3267268](https://www.drupal.org/node/3267268)

`\Drupal\node\NodeStorage::updateType` is deprecated, there is no replacement.

Previously, this function was called from `NodeType::preSave` if a node type's ID changed, however this is dangerous and potentially destructive. Changing the id of an existing node type should not be supported by API functions.

*Source: [\Drupal\node\NodeStorage::updateType is deprecated](https://www.drupal.org/node/3515214), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
