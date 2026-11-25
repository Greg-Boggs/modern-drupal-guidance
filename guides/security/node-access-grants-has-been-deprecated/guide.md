---
name: node-access-grants-has-been-deprecated
title: "node_access_grants has been deprecated"
description: "node_access_grants has been deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3578055
change-record-nid: 3578055
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2473041](https://www.drupal.org/node/2473041)

`node_access_grants` has been deprecated.

Use `\Drupal::service(NodeGrantsHelper::class)->nodeAccessGrants($operation, $account);` instead.

The following now require `NodeGrantsHelper` as an argument.

- `NodeAccessGrantsCacheContext()`
- `NodeGrantDatabaseStorage()`

*Source: [node_access_grants has been deprecated](https://www.drupal.org/node/3578055), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
