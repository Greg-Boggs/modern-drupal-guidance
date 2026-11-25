---
name: block-configuration-for-the-syndicate-block-plugin-has-been
title: "Block configuration for the syndicate block plugin has been removed"
description: "Block configuration for the syndicate block plugin has been removed"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3625691
change-record-nid: 3625691
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3581349](https://www.drupal.org/node/3581349), [#3518990](https://www.drupal.org/node/3518990)

The syndicate block plugin has been deprecated in 11.x and removed in 12.x. However, stale block configuration could still be left on sites.

Drupal 12.0.0 will contain an update to remove the block configuration if it still exists, as long as the provider of the block continues to be node module. This allows a custom or contrib fork of the syndicate block to take over ownership of the block in Drupal 11 (prior to the Drupal 12 update, if necessary).

*Source: [Block configuration for the syndicate block plugin has been removed](https://www.drupal.org/node/3625691), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
