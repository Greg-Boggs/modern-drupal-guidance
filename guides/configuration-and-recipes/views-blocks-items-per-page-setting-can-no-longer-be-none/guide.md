---
name: views-blocks-items-per-page-setting-can-no-longer-be-none
title: "Views blocks' `items_per_page` setting can no longer be `none`"
description: "Views blocks' `items_per_page` setting can no longer be `none`"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3522240
change-record-nid: 3522240
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3520946](https://www.drupal.org/node/3520946)

Views blocks always have an `items_per_page` setting -- that is, the number of items from the view that should be visible in the block.

Until [#3520946: Make View blocks (block.settings.view_block:\*) fully validatable](https://www.drupal.org/project/drupal/issues/3520946), that setting could either be a number, or `none` to defer to whatever the view itself has configured. Now, `none` is no longer supported; to defer to the view, `items_per_page` should be null.

*Source: [Views blocks' \`items_per_page\` setting can no longer be \`none\`](https://www.drupal.org/node/3522240), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
