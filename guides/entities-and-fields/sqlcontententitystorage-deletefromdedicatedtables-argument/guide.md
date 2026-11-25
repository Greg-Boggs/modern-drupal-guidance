---
name: sqlcontententitystorage-deletefromdedicatedtables-argument
title: "SqlContentEntityStorage::deleteFromDedicatedTables() argument changed"
description: "SqlContentEntityStorage::deleteFromDedicatedTables() argument changed"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3518611
change-record-nid: 3518611
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3455151](https://www.drupal.org/node/3455151)

The protected method `deleteFromDedicatedTables` in `SqlContentEnt‎ityStorage` class accepts an array of entity ID. Previously, the parameter was a single entity.

This allows deleting several entities with a single SQL statement, which is more performant than a statement per entity.

If a custom entity storage handler is overriding or calling this method, it will need to be updated to work with the parameter change.

**Before:**

```php
protected function deleteFromDedicatedTables(ContentEntityInterface $entity)
```

**After:**

```php
protected function deleteFromDedicatedTables(array $ids)
```

*Source: [SqlContentEntityStorage::deleteFromDedicatedTables() argument changed](https://www.drupal.org/node/3518611), a Drupal core change record by [vidorado](https://www.drupal.org/user/1050234) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
