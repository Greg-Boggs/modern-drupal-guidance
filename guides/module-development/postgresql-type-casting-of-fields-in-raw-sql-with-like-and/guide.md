---
name: postgresql-type-casting-of-fields-in-raw-sql-with-like-and
title: "PostgreSQL type-casting of fields in raw SQL with LIKE and regex operators is deprecated"
description: "PostgreSQL type-casting of fields in raw SQL with LIKE and regex operators is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3615418
change-record-nid: 3615418
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3615415](https://www.drupal.org/node/3615415)

PostgreSQL has no LIKE or regular expression operators for non-text types such as integers. The pgsql driver rewrote all SQL in `Connection::prepareStatement()` to add a `::text` type-cast to fields used with these operators. Relying on this rewrite for SQL passed as a string is deprecated in Drupal 11.5.0. The rewrite is removed in Drupal 13.0.0.

Query builder queries are not affected. Their conditions get the type-cast when they are compiled.

Before (deprecated):

```php
$result = $connection->query('SELECT [name] FROM {test} WHERE [age] LIKE :pattern', [':pattern' => '2%']);
```

After, either add the cast in the SQL:

```php
$result = $connection->query('SELECT [name] FROM {test} WHERE [age]::text LIKE :pattern', [':pattern' => '2%']);
```

or use the query builder:

```php
$result = $connection->select('test', 't')
  ->fields('t', ['name'])
  ->condition('age', '2%', 'LIKE')
  ->execute();
```

The `::text` cast is PostgreSQL syntax. Code that must run on multiple database drivers can use the query builder, or ask the connection for the suffix the driver needs with the new method `Connection::getConditionFieldSuffix()`:

```php
$suffix = $connection->getConditionFieldSuffix('LIKE');
$result = $connection->query("SELECT [name] FROM {test} WHERE [age]$suffix LIKE :pattern", [':pattern' => '2%']);
```

The method returns the SQL the driver appends to a field for the given operator. For LIKE on PostgreSQL that is `'::text'`. On MySQL and SQLite it is an empty string.

### For database driver authors

The directives returned by `Connection::mapConditionOperator()` support a new `field_suffix` key. `Condition::compile()` appends its value to the field. `Connection::getConditionFieldSuffix()` returns it for code that builds SQL snippets. The pgsql driver uses it to add the `::text` cast for the LIKE and regex operators.

*Source: [PostgreSQL type-casting of fields in raw SQL with LIKE and regex operators is deprecated](https://www.drupal.org/node/3615418), a Drupal core change record by [daffie](https://www.drupal.org/user/116368) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
