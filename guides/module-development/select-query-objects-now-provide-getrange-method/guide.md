---
name: select-query-objects-now-provide-getrange-method
title: "Select query objects now provide getRange() method"
description: "Select query objects now provide getRange() method"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3574425
change-record-nid: 3574425
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2986699](https://www.drupal.org/node/2986699)

A new Select::getRange() method has been added to the database query API. This allows retrieving the currently configured range (start and length) from a Select query object.

Previously, there was no supported way to inspect the range applied to a query after calling range(). This made it difficult for query extenders and integrations to adjust behavior based on the existing range configuration.

The following methods were added:

```php
\Drupal\Core\Database\Query\SelectInterface::getRange()

\Drupal\Core\Database\Query\Select::getRange()

\Drupal\Core\Database\Query\SelectExtender::getRange()
```

The method returns an array with start and length keys, or NULL if no range is set.

#### Before/After code examples

```php
$query = $connection->select('node', 'n');
$query->range(0, 10);

// No supported way to retrieve the range.
```

```php
$query = $connection->select('node', 'n');
$query->range(0, 10);

$range = $query->getRange();
// ['start' => 0, 'length' => 10]
```

*Source: [Select query objects now provide getRange() method](https://www.drupal.org/node/3574425), a Drupal core change record by [neptune-dc](https://www.drupal.org/user/3783243) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
