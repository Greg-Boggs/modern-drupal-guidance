---
name: entitytypeinterface-getoriginalclass-method-is-deprecated
title: "EntityTypeInterface::getOriginalClass method is deprecated"
description: "EntityTypeInterface::getOriginalClass method is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3587853
change-record-nid: 3587853
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3557461](https://www.drupal.org/node/3557461)

Since [#3127026: Not possible to override an entity type class multiple times](https://www.drupal.org/project/drupal/issues/3127026), there are no more usages of the EntityTypeInterface::getOriginalClass method so it is now deprecated.

A new `getDecoratedClasses` method had been added in case your code needs to check for an entity type class.

**Before**

```php
$entity_type->getOriginalClass() == $class_name
```

**After**

```php
in_array($class_name, $entity_type->getDecoratedClasses(), TRUE)
```

The new method supports any number of overrides.

*Source: [EntityTypeInterface::getOriginalClass method is deprecated](https://www.drupal.org/node/3587853), a Drupal core change record by [grimreaper](https://www.drupal.org/user/2388214) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
