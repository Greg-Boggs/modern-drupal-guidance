---
name: the-root-parameter-for-drupal-core-database-connection
title: "The $root parameter for \\Drupal\\Core\\Database\\Connection::createConnectionOptionsFromUrl is deprecated"
description: "The $root parameter for \\Drupal\\Core\\Database\\Connection::createConnectionOptionsFromUrl is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3511287
change-record-nid: 3511287
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3506931](https://www.drupal.org/node/3506931), [#3522513](https://www.drupal.org/node/3522513)

The $root parameter for \Drupal\Core\Database\Connection::createConnectionOptionsFromUrl() and \Drupal\Core\Database\Database::convertDbUrlToConnectionInfo() is deprecated, it is no longer needed by any implementation.

As the argument was required, pass NULL in any calls; this can then be removed in Drupal 12.

*Source: [The $root parameter for \Drupal\Core\Database\Connection::createConnectionOptionsFromUrl is deprecated](https://www.drupal.org/node/3511287), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
