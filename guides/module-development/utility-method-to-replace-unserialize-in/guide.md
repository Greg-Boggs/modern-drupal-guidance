---
name: utility-method-to-replace-unserialize-in
title: "Utility method to replace unserialize() in SqlContentEntityStorage()"
description: "Utility method to replace unserialize() in SqlContentEntityStorage()"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3495417
change-record-nid: 3495417
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3300404](https://www.drupal.org/node/3300404)

The method `handleNullableFieldUnserialize()` is added to `SqlContentEntityStorage` and replaces the use of `unserialize()` throughout the class. Unlike `unserialize()`, this method returns NULL if the input value is NULL..

This affects fields using `\Drupal\Core\Entity\Sql\SqlContentEntityStorage` that have serialized columns that can be NULL if they are not required.

#### Before

`\Drupal\Core\Entity\Sql\SqlContentEntityStorage` automatically unserializes these columns, which causes an E_WARNING and a deprecation warning in the event of a NULL value. For example,

```php
Deprecated function: unserialize(): Passing null to parameter #1 ($data) of type string is deprecated in Drupal\Core\Entity\Sql\SqlContentEntityStorage->loadFromSharedTables()
```

#### After

The method `handleNullableFieldUnserialize()` returns NULL if the value is NULL. If not NULL the value is passed to `unserialize()`. No warning is issued.

*Source: [Utility method to replace unserialize() in SqlContentEntityStorage()](https://www.drupal.org/node/3495417), a Drupal core change record by [spokje](https://www.drupal.org/user/3386132) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
