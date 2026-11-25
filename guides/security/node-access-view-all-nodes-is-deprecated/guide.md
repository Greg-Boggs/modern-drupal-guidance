---
name: node-access-view-all-nodes-is-deprecated
title: "node_access_view_all_nodes is deprecated"
description: "node_access_view_all_nodes is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3038909
change-record-nid: 3038909
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3038908](https://www.drupal.org/node/3038908)

`node_access_view_all_nodes` is deprecated.

its functionality was combined into `\Drupal\node\NodeGrantDatabaseStorage::checkAll()`.

## Before

```php
$view_all_nodes = node_access_view_all_nodes();

// Reset the internal cache.
drupal_static_reset('node_access_view_all_nodes');
```

## After

```php
$view_all_nodes = \Drupal::entityTypeManager()->getAccessControlHandler('node')->checkAllGrants($account ?? \Drupal::currentUser())

// Reset the internal cache.
\Drupal::service('node.view_all_nodes_memory_cache')->deleteAll();
```

Calling `drupal_static_reset` with `node_access_view_all_nodes` is also deprecated.

2 constructors also have new arguments:

`NodeAccessGrantsCacheContext::__construct()` now requires an `$entityTypeManager`\
`NodeGrantDatabaseStorage::__construct()` now requires a `$memoryCache` which is the new `'node.view_all_nodes_memory_cache'` service.

*Source: [node_access_view_all_nodes is deprecated](https://www.drupal.org/node/3038909), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
