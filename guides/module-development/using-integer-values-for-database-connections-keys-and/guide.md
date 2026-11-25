---
name: using-integer-values-for-database-connections-keys-and
title: "Using integer values for database connections keys and targets is deprecated"
description: "Using integer values for database connections keys and targets is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3577925
change-record-nid: 3577925
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3532930](https://www.drupal.org/node/3532930)

Using integer values for database connections keys and targets is deprecated.

In fact they were never supported, but strict typehinting introduced in [#3532930: Make Drupal\Core\Database\Database type strict and PHPStan L10 compliant](https://www.drupal.org/project/drupal/issues/3532930) surfaced the bug that they might have been passed in without any error.

*Source: [Using integer values for database connections keys and targets is deprecated](https://www.drupal.org/node/3577925), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
