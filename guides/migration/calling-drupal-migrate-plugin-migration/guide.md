---
name: calling-drupal-migrate-plugin-migration
title: "Calling \\Drupal\\migrate\\Plugin\\Migration::getMigrationDependencies with the expand parameter is deprecated"
description: "Calling \\Drupal\\migrate\\Plugin\\Migration::getMigrationDependencies with the expand parameter is deprecated"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3442785
change-record-nid: 3442785
introduced-in-version: "11.0.0"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0\
Issue links: [#3439369](https://www.drupal.org/node/3439369)

Calling `\Drupal\migrate\Plugin\Migration::getMigrationDependencies()` with the `$expand` parameter has no effect. It is flagged as deprecated in Drupal 11.

There is more detail in the previous change record for the adding of the parameter, [Migration::getMigrationDependencies() has a new parameter and MigrationPluginManager::expandPluginIds() is made public](https://www.drupal.org/node/3266691)

*Source: [Calling \Drupal\migrate\Plugin\Migration::getMigrationDependencies with the expand parameter is deprecated](https://www.drupal.org/node/3442785), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
