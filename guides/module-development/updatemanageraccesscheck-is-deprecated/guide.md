---
name: updatemanageraccesscheck-is-deprecated
title: "UpdateManagerAccessCheck is deprecated"
description: "UpdateManagerAccessCheck is deprecated"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3458658
change-record-nid: 3458658
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3458403](https://www.drupal.org/node/3458403)

`\Drupal\update\Access\UpdateManagerAccessCheck` is deprecated in 11.1.x.

This access check is applied to routes provided by the Update Manager module. The check grants access to routes based on the `allow_authorize_operations` setting, but can lead to uncacheable responses with Dynamic Page Cache. Instead, the routes are dynamically altered so their access requirement is `FALSE` when `allow_authorize_operations` is also `FALSE`.

*Source: [UpdateManagerAccessCheck is deprecated](https://www.drupal.org/node/3458658), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
