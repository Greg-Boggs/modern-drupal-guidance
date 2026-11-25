---
name: system-menu-blocks-have-configuration-option-for-add-a-css
title: "System menu blocks have configuration option for \"Add a CSS class to ancestors of the current page\""
description: "System menu blocks have configuration option for \"Add a CSS class to ancestors of the current page\""
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3533514
change-record-nid: 3533514
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3529464](https://www.drupal.org/node/3529464)

System menu blocks now have a configuration option for " "Add a CSS class to ancestors of the current page". The configuration option exposes behaviour which was previously always on and unconfigurable.

When sites aren't using the menu active trail behaviour to style menus, which may be the case when the menu only has one level of items, or when all items are expanded, this option can be disabled to considerably improve cache hit rates for menu rendering.

The behavior for existing menu blocks will remain the same unless explicitly changed in the block configuration.

*Source: [System menu blocks have configuration option for "Add a CSS class to ancestors of the current page"](https://www.drupal.org/node/3533514), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
