---
name: blocks-are-no-longer-created-automatically-when-themes-or
title: "Blocks are no longer created automatically when themes or modules are enabled during config sync"
description: "Blocks are no longer created automatically when themes or modules are enabled during config sync"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3525560
change-record-nid: 3525560
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3182716](https://www.drupal.org/node/3182716)

`block_themes_installed` and `block_modules_installed` no longer execute when configuration is syncing.

During recipe application. Blocks will no longer be duplicated from the existing theme, so recipe authors that change themes will need to be declarative about which blocks they want to import and place on the site.

When enabling themes through the UI or with Drush there is no change.

*Source: [Blocks are no longer created automatically when themes or modules are enabled during config sync](https://www.drupal.org/node/3525560), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
