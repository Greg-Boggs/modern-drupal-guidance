---
name: the-length-of-menu-tree-url-and-menu-tree-route-param-key
title: "The length of menu_tree.url and menu_tree.route_param_key were increased"
description: "The length of menu_tree.url and menu_tree.route_param_key were increased"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3482247
change-record-nid: 3482247
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3106205](https://www.drupal.org/node/3106205)

The maximum length of the `route_param_key` and `url` fields in the `menu_tree` table has been increased from 255 to 2048 characters. This change allows for longer URLs and route parameters to be stored in the menu system. Previously, the 255-character limit on these fields could cause errors when adding menu items with long external URLs or complex route parameters.

No changes are required in custom code. However, developers and site builders should be aware that the database schema for the `menu_tree` table will be updated automatically during the Drupal update process.

*Source: [The length of menu_tree.url and menu_tree.route_param_key were increased](https://www.drupal.org/node/3482247), a Drupal core change record by [murilohp](https://www.drupal.org/user/3650571) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
