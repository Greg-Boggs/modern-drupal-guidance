---
name: new-schema-method-to-execute-data-definition-language-ddl
title: "New Schema method to execute data definition language (DDL) SQL statements"
description: "New Schema method to execute data definition language (DDL) SQL statements"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3402926
change-record-nid: 3402926
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3384999](https://www.drupal.org/node/3384999)

SQL that executes data definition language (DDL) statements should be processed through the protected `Schema::executeDdlStatement()` method and no longer with the `Connection::query()` method. This allows Drupal’s transaction manager to handle gracefully autocommits that occur when a DDL statement is executed while a Drupal transaction stack is active, for databases that do not support transactional DDL (MySql, Oracle, ...).

Within the `Schema` class of a database driver,

**Before**

`$this->connection->query('DROP TABLE {test}');`

**After**

`$this->executeDdlStatement('DROP TABLE {test}');`

*Source: [New Schema method to execute data definition language (DDL) SQL statements](https://www.drupal.org/node/3402926), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
