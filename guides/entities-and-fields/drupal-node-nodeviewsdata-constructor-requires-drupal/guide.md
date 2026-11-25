---
name: drupal-node-nodeviewsdata-constructor-requires-drupal
title: "\\Drupal\\node\\NodeViewsData() constructor requires \\Drupal::service('extension.list.module')"
description: "\\Drupal\\node\\NodeViewsData() constructor requires \\Drupal::service('extension.list.module')"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3493129
change-record-nid: 3493129
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3449181](https://www.drupal.org/node/3449181)

Calling `\Drupal\node\NodeViewsData()` now require `\Drupal::service('extension.list.module'` in their constructor.

Any code initializing either of these classes should pass an instance of `\Drupal::service('extension.list.module')` as an argument.

*Source: [\Drupal\node\NodeViewsData() constructor requires \Drupal::service('extension.list.module')](https://www.drupal.org/node/3493129), a Drupal core change record by [mxr576](https://www.drupal.org/user/315522) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
