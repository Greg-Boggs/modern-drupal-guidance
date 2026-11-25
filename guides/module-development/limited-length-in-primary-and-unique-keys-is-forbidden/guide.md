---
name: limited-length-in-primary-and-unique-keys-is-forbidden
title: "Limited length in primary and unique keys is forbidden"
description: "Limited length in primary and unique keys is forbidden"
drupal-core: ">=12.1"
source-url: https://www.drupal.org/node/3375071
change-record-nid: 3375071
introduced-in-version: "12.1.0"
introduced-in-branch: "12.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.1.x\
Introduced in version: 12.1.0\
Issue links: [#3082239](https://www.drupal.org/node/3082239), [#3411490](https://www.drupal.org/node/3411490)

Specifying limited length for primary and unique keys is now forbidden. In any case, most DBs do not allow that anyway, so now Drupal just standardize on that. Only indexes allow that.

The Database Schema Definition API introduced in [#3411490: Replace array-based DB Schema API with a value object structure](https://www.drupal.org/project/drupal/issues/3411490) prevents that on the specification level, but Schema methods still allow that, and that is now deprecated.

In Drupal 12.1 this is deprecated:

```php
    $this->connection->schema()->createTable('mytable', [
      'fields' => [
        'id' => [
          'type' => 'varchar',
          'length' => 50,
        ],
        'field' => [
          'type' => 'varchar',
          'length' => 50,
        ],
      ],
      'primary key' => [['id', 10]],
      'unique keys' => [
        'field' => [['field', 10]],
      ],
    ]);
```

and as of Drupal 13 will throw a `SchemaException`. Instead, **if using direct Schema method calls and not the Database Schema Definition API**, define only full columns in primary and unique keys:

```php
    $this->connection->schema()->createTable('mytable', [
      'fields' => [
        'id' => [
          'type' => 'varchar',
          'length' => 50,
        ],
        'field' => [
          'type' => 'varchar',
          'length' => 50,
        ],
      ],
      'primary key' => ['id'],
      'unique keys' => [
        'field' => ['field'],
      ],
    ]);
```

This is allowed, for indexes:

```php
    $this->connection->schema()->createTable('mytable', [
      'fields' => [
        'field' => [
          'type' => 'varchar',
          'length' => 50,
        ],
      ],
      'indexes' => [
        'field' => [['field', 10]],
      ],
    ]);
```

*Source: [Limited length in primary and unique keys is forbidden](https://www.drupal.org/node/3375071), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
