---
name: using-specific-pdo-drivers-instead-of-pdoconnection-on-php
title: "Using specific PDO drivers instead of PDOConnection on PHP 8.4+"
description: "Using specific PDO drivers instead of PDOConnection on PHP 8.4+"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3547277
change-record-nid: 3547277
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3546531](https://www.drupal.org/node/3546531)

To ensure compatibility with PHP 8.4 and PHP 8.5, this change updates the database connection classes to use the new driver-specific PDO connection classes (`Pdo\Mysql`, `Pdo\Pgsql`, `Pdo\Sqlite`) that were introduced in [PHP 8.4](https://wiki.php.net/rfc/pdo_driver_specific_subclasses). This avoids deprecation warnings that would otherwise appear [starting in PHP 8.5](https://wiki.php.net/rfc/deprecations_php_8_5#deprecate_driver_specific_pdo_constants_and_methods).

The changes primarily involve conditionally using the new PDO driver classes when the PHP version is 8.4 or higher. This affects the `mysql`, `pgsql`, and `sqlite` database drivers. For the SQLite driver, the code has also been updated to use the new [createFunction()](https://www.php.net/manual/ru/pdo-sqlite.createfunction.php) syntax with first-class callable syntax when running on PHP 8.4+

*Source: [Using specific PDO drivers instead of PDOConnection on PHP 8.4+](https://www.drupal.org/node/3547277), a Drupal core change record by [andypost](https://www.drupal.org/user/118908) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
