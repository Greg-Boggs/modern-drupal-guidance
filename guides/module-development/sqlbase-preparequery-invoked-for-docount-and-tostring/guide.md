---
name: sqlbase-preparequery-invoked-for-docount-and-tostring
title: "SqlBase::prepareQuery invoked for ::doCount and ::__toString"
description: "SqlBase::prepareQuery invoked for ::doCount and ::__toString"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3502899
change-record-nid: 3502899
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2833060](https://www.drupal.org/node/2833060)

The class `Drupal\migrate\Plugin\migrate\source\SqlBase` is updated. This is the base class for most SQL-based migration source plugins.

Previously, `SqlBase::prepareQuery()` was not invoked from `doCount()` nor `__toString()`. This leads to counts and string representation of the query that are not actually representative of the final query. This is because `prepareQuery` could be adjusted for query tag alters or any other more dynamic modifications. If you already adjust for this in a custom Sql-based plugin, that is no longer necessary.

### Previously

```php
  public function __toString() {
    return (string) $this->query();
  }

  protected function doCount() {
    return (int) $this->query()->countQuery()->execute()->fetchField();
  }
```

Prepare query allows folks to alter the query, which can adjust the count and string representation of the query.

### Now

```php
  public function __toString() {
    return (string) $this->prepareQuery();
  }

  protected function doCount() {
    return (int) $this->prepareQuery()->countQuery()->execute()->fetchField();
  }
```

*Source: [SqlBase::prepareQuery invoked for ::doCount and ::\__toString](https://www.drupal.org/node/3502899), a Drupal core change record by [heddn](https://www.drupal.org/user/1463982) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
