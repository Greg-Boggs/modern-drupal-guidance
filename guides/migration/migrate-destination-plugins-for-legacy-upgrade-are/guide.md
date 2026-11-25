---
name: migrate-destination-plugins-for-legacy-upgrade-are
title: "Migrate destination plugins for legacy upgrade are deprecated"
description: "Migrate destination plugins for legacy upgrade are deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3533565
change-record-nid: 3533565
introduced-in-version: "11.3.x"
introduced-in-branch: "11.3.0"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.0\
Introduced in version: 11.3.x\
Issue links: [#3502752](https://www.drupal.org/node/3502752)

The following classes and methods related to Migrate destinations are deprecated. These classes and methods are designed specifically for migration from legacy Drupal sites.

They will be removed in Drupal 12.0. There is no replacement.

#### Destination plugins

1. \Drupal\migrate\Plugin\migrate\destination\EntityContentComplete
2. \Drupal\shortcut\Plugin\migrate\destination\EntityShortcutSet
3. \Drupal\system\Plugin\migrate\destination\d7\ThemeSettings
4. \Drupal\user\Plugin\migrate\destination\EntityUserRole

#### Deriver

1. \Drupal\migrate\Plugin\Derivative\MigrateEntityComplete

#### Import methods

1. \Drupal\block\Plugin\migrate\destination\EntityBlock::import()
2. \Drupal\comment\Plugin\migrate\destination\EntityComment::import()
3. \Drupal\search\Plugin\migrate\destination\EntitySearchPage::import()
4. \Drupal\node\Plugin\migrate\destination\EntityNodeType::import()

*Source: [Migrate destination plugins for legacy upgrade are deprecated](https://www.drupal.org/node/3533565), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
