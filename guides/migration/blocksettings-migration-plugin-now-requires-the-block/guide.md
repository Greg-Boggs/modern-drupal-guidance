---
name: blocksettings-migration-plugin-now-requires-the-block
title: "BlockSettings migration plugin now requires the block plugin manager"
description: "BlockSettings migration plugin now requires the block plugin manager"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3522023
change-record-nid: 3522023
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3520944](https://www.drupal.org/node/3520944)

The `block_settings` migration plugin (used for migrations from Drupal 6 and Drupal 7, implemented by `\Drupal\block\Plugin\migrate\process\BlockSettings`) now requires the block plugin manager service (`\Drupal\Core\Block\BlockManagerInterface`) to be passed to its constructor so that it can normalize block settings after processing them.

*Source: [BlockSettings migration plugin now requires the block plugin manager](https://www.drupal.org/node/3522023), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
