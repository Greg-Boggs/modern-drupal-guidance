---
name: migrate-source-plugins-for-legacy-upgrade-are-deprecated
title: "Migrate source plugins for legacy upgrade are deprecated"
description: "Migrate source plugins for legacy upgrade are deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3533564
change-record-nid: 3533564
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3507572](https://www.drupal.org/node/3507572)

Since the entire Drupal Migrate module will be removed in Drupal 12.0, many things need to be deprecated in preparation. The following classes/traits are deprecated for later removal.

- `Drupal\migrate_drupal\Plugin\migrate\DrupalSqlBase`
- `Drupal\migrate_drupal\Plugin\migrate\EmptySource`
- `Drupal\migrate_drupal\Plugin\migrate\I18nQueryTrait`

If you have migration classes that require these, either copy the contents of these classes into your code base or plan on upgrading to Drupal 11.

*Source: [Migrate source plugins for legacy upgrade are deprecated](https://www.drupal.org/node/3533564), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
