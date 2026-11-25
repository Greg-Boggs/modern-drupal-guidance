---
name: views-based-theme-suggestions-for-node-and-comment
title: "Views based theme suggestions for node and comment templates deprecated"
description: "Views based theme suggestions for node and comment templates deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3541462
change-record-nid: 3541462
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2728419](https://www.drupal.org/node/2728419)

Views used to provide theme suggestions to theme nodes or comments differently based on the view that is displaying them.

There are known cache bugs, as those theme suggestions do not come with approriate cacheability metadata, which means that they will not work reliably.

These theme suggestions are now deprecated. Use different view modes instead when different views should display nodes differently.

*Source: [Views based theme suggestions for node and comment templates deprecated](https://www.drupal.org/node/3541462), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
