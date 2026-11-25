---
name: node-access-rebuild-functions-are-deprecated
title: "node_access_rebuild functions are deprecated"
description: "node_access_rebuild functions are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3534610
change-record-nid: 3534610
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3533299](https://www.drupal.org/node/3533299)

The procedural functions `node_access_rebuild()` and `node_access_needs_rebuild() ` have been deprecated.

Use `\Drupal::service('Drupal\node\NodeAccessRebuild')->needsRebuild()` and `\Drupal::service('Drupal\node\NodeAccessRebuild')->setNeedsRebuild()` instead of `node_access_needs_rebuild()`

Use `\Drupal::service('Drupal\node\NodeAccessRebuild')->rebuild()` instead of `node_access_rebuild()`

The internal functions `_node_access_rebuild_batch_operation()` and `_node_access_rebuild_batch_finished()` have also been removed and replaced with static methods in the new service class `NodeAccessRebuild`.

*Source: [node_access_rebuild functions are deprecated](https://www.drupal.org/node/3534610), a Drupal core change record by [virag.jain](https://www.drupal.org/user/3840647) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
