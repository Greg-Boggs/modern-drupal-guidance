---
name: upsert-can-specify-custom-expressions-for-the-update-case
title: "Upsert can specify custom expressions for the update case"
description: "Upsert can specify custom expressions for the update case"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3607708
change-record-nid: 3607708
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3604286](https://www.drupal.org/node/3604286)

In the `Upsert` implementation, when the insert fails and the db therefore falls back to an update, we used to fall back to the minimal case of updating the record with the values passed for insert.

Now `Upsert` has been extended so it can update based an on expression. This can be very useful, for example, to ensure an atomic db operation to increment a counter or a score.

This happens by passing to the `::field()` method an implementation of the `UpsertUpdateExpression` class that defines separately the behavior of the update case.

For example,

```php
use Drupal\Core\Database\Query\UpsertUpdateExpression;

...

        $this->connection->upsert('cachetags')
          ->key(['tag'])
          ->fields([
            'tag',
            'invalidations' => new UpsertUpdateExpression('{cachetags}.[invalidations] + 1'),
          ])
          ->values([
            'tag' => $tag,
            'invalidations' => 1,
          ])
          ->execute();
```

would set the `invalidation` column value to 1 in case of an insert, or increment the column value by 1 in case of an update.

*Source: [Upsert can specify custom expressions for the update case](https://www.drupal.org/node/3607708), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
