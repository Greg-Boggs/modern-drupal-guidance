---
name: upsert-queries-can-now-use-unique-primary-key-constraints
title: "Upsert queries can now use unique / primary key constraints composed of multiple fields"
description: "Upsert queries can now use unique / primary key constraints composed of multiple fields"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3565717
change-record-nid: 3565717
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2547493](https://www.drupal.org/node/2547493)

Upsert database queries can now be used on tables with unique/primary keys composed of multiple fields.

For this purpose, a new `\Drupal\Core\Database\Query\Upsert::keyColumns()` method was added, and `\Drupal\Core\Database\Query\Upsert::key()` has been deprecated.

Usage example for a table with a composite primary key on the `collection` and `name` columns:

```php
    $this->connection->upsert($this->table)
      ->key(['collection', 'name'])
      ->fields([
        'collection' => $collection,
        'name' => $key,
        'value' => $value,
      ])
      ->execute();
```

*Source: [Upsert queries can now use unique / primary key constraints composed of multiple fields](https://www.drupal.org/node/3565717), a Drupal core change record by [amateescu](https://www.drupal.org/user/729614) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
