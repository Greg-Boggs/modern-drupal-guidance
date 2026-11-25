---
name: drupal-menu-ui-plugin-menu-localaction-menulinkadd-is
title: "\\Drupal\\menu_ui\\Plugin\\Menu\\LocalAction\\MenuLinkAdd is deprecated"
description: "\\Drupal\\menu_ui\\Plugin\\Menu\\LocalAction\\MenuLinkAdd is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3490245
change-record-nid: 3490245
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2762131](https://www.drupal.org/node/2762131)

`\Drupal\menu_ui\Plugin\Menu\LocalAction\MenuLinkAdd` is deprecated and will be removed in Drupal 12. Instead, use `\Drupal\Core\Menu\LocalActionWithDestination`.

This change removes the dependency on the `menu_ui` module. Sites using the `MenuLinkAdd` plugin should check to determine if the menu_ui module can be uninstalled when using the `LocalActionWithDestination`.

*Source: [\Drupal\menu_ui\Plugin\Menu\LocalAction\MenuLinkAdd is deprecated](https://www.drupal.org/node/3490245), a Drupal core change record by [tstoeckler](https://www.drupal.org/user/107158) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
