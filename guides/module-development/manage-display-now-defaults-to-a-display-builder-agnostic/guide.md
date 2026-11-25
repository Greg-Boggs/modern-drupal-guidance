---
name: manage-display-now-defaults-to-a-display-builder-agnostic
title: "\"Manage display\" now defaults to a display-builder agnostic overview page"
description: "\"Manage display\" now defaults to a display-builder agnostic overview page"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3574383
change-record-nid: 3574383
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3564234](https://www.drupal.org/node/3564234)

A new overview page has been added at `/admin/structure/types/manage/{bundle}/display`. The "Manage display" tab now defaults to this overview instead of the default view mode edit form. The page lists all display modes for the bundle with their label, description, and enabled/disabled status, which can be toggled directly from the overview.

![](https://www.drupal.org/files/screencapture-localhost-8888-en-admin-structure-types-manage-article-display-2026-04-07-16_58_22.png)

The previous route pointed directly to the default view mode edit form, which prevents deprecation of the default view mode ([#2844203: Improve/Simplify situation around Default/Full view modes/view displays](https://www.drupal.org/project/drupal/issues/2844203)). The old interface also implicitly assumed Field UI is the only display builder, making it difficult for Layout Builder, Drupal Canvas, and other builders to integrate cleanly. The new overview page is display-builder agnostic and serves as a neutral navigation hub.

If your module has functional tests or code that relies on the "Manage display" tab routing directly to the default view mode, update those references to account for the new overview page.

*Source: ["Manage display" now defaults to a display-builder agnostic overview page](https://www.drupal.org/node/3574383), a Drupal core change record by [lauriii](https://www.drupal.org/user/1078742) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
