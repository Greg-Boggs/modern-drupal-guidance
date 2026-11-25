---
name: functions-in-menu-ui-module-are-deprecated-and-move-to-hooks
title: "Functions in menu_ui.module are deprecated and move to hooks"
description: "Functions in menu_ui.module are deprecated and move to hooks"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3571402
change-record-nid: 3571402
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3571400](https://www.drupal.org/node/3571400)

All the functions in menu_ui.module have been deprecated

| Before | After |   |
| --- | --- | --- |
| \_menu_ui_node_save | MenuUiHelper::menuUiNodeSave() |   |
| menu_ui_get_menu_link_defaults() | MenuUiHelper::getMenuLinkDefaults() |   |
| menu_ui_node_builder | \Drupal::service(MenuUiHooks::class)->nodeBuilder() |   |
| menu_ui_form_node_form_submit | \Drupal::service(MenuUiHooks::class)->formNodeFormSubmit() |   |
| menu_ui_form_node_type_form_validate | \Drupal::service(MenuUiHooks::class)->formNodeTypeFormValidate() |   |
| menu_ui_form_node_type_form_builder | \Drupal::service(MenuUiHooks::class)->formNodeTypeFormBuilder() |   |

*Source: [Functions in menu_ui.module are deprecated and move to hooks](https://www.drupal.org/node/3571402), a Drupal core change record by [smustgrave](https://www.drupal.org/user/3252890) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
