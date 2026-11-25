---
name: migrate-field-plugins-are-deprecated
title: "Migrate field plugins are deprecated"
description: "Migrate field plugins are deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3533566
change-record-nid: 3533566
introduced-in-version: "11.3.x"
introduced-in-branch: "11.3.0"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.0\
Introduced in version: 11.3.x\
Issue links: [#3502749](https://www.drupal.org/node/3502749)

Since the entire Drupal Migrate module will be removed in Drupal 12.0, many things need to be deprecated in preparation. The following plugin manager is deprecated for later removal.

`Drupal\migrate_drupal\Plugin\MigrateFieldPluginManager` aka `plugin.manager.migrate.field`\
and directly related process plugins that leveraged this plugin manager:\
`Drupal\migrate_drupal\Plugin\migrate\process\FieldType` aka `#[MigrateProcess('field_type')]`\
`Drupal\migrate_drupal\Plugin\migrate\process\ProcessField` aka `#[MigrateProcess('process_field')]`

If you have migrations that require field migrations, plan on upgrading to Drupal 11 before moving to Drupal 12.

*Source: [Migrate field plugins are deprecated](https://www.drupal.org/node/3533566), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
