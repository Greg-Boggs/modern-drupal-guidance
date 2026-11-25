---
name: a-new-database-driver-mysqli-for-mysql-mariadb-for-parallel
title: "A new database driver (mysqli) for MySQL/MariaDB for parallel queries"
description: "A new database driver (mysqli) for MySQL/MariaDB for parallel queries"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3516913
change-record-nid: 3516913
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3259709](https://www.drupal.org/node/3259709)

A new experimental database driver for MySQL and MariaDB has been added. The new database driver is named MySQLi. The database driver is labeled as `experimental` and therefore not yet fully supported. Use the database driver only for evaluating purposes. The database driver is also marked as hidden.

The new database driver uses another PHP extension to connect to MySQL/MariaDB. The default database driver MySQL/MariaDB uses the mysql PDO PHP extension. The new database driver uses the mysqli PHP extension. This is a more modern PHP extension which allows database queries to be run in parallel instead of sequential as with the PDO extension. For this to work we will use the async Revolt ([https://revolt.run/](https://revolt.run/)) PHP event loop. The creation of this new database driver will unblock work on the use of the async PHP event loop. Examples of how this will make Drupal faster ():\
\- The loading of Drupal entities with many fields will be faster. Every field stored its values in its own database table.\
\- The loading of views with linked entities will be faster.\
\- Any place where multiple queries can run in parallel can be made faster.

How to test this new database driver. The database driver cannot be selected during the install process. Select the regular database driver for MySQL/MariaDB during the site install process or do a `drush site:install`. When you have a running Drupal site, first install/enable the mysqli module, then change in the `settings.php` file the used database connection in the following way.

Install the mysqli module:\
`drush pm:install mysqli`

Before:

```php
$databases['default']['default'] = array (
  'database' => 'db',
  'username' => 'db',
  'password' => 'db',
  'host' => 'db', 
  'prefix' => '',
  'driver' => 'mysql',
  'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
  'autoload' => 'core/modules/mysql/src/Driver/Database/mysql/',
);
```

After:

```php
$databases['default']['default'] = array (
  'database' => 'db',
  'username' => 'db',
  'password' => 'db',
  'host' => 'db', 
  'prefix' => '',
  'driver' => 'mysqli',
  'namespace' => 'Drupal\\mysqli\\Driver\\Database\\mysqli',
  'autoload' => 'core/modules/mysqli/src/Driver/Database/mysqli/',
  'dependencies' => array(
    'mysql' => array(
      'namespace' => 'Drupal\\mysql',
      'autoload' => 'core/modules/mysql/src/',
    ),
  ),
);
```

On the status page in the Database section you should see something like: "MySQL via mysqli" or "MariaDB via mysqli".

The long term goal is for this new database driver to replace the existing mysql database driver.

*Source: [A new database driver (mysqli) for MySQL/MariaDB for parallel queries](https://www.drupal.org/node/3516913), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
