---
name: static-calls-to-overridden-entity-type-will-still-work-if
title: "Static calls to overridden entity type will still work if the entity type is overridden another time"
description: "Static calls to overridden entity type will still work if the entity type is overridden another time"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3557464
change-record-nid: 3557464
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3127026](https://www.drupal.org/node/3127026), [#3557464](https://www.drupal.org/node/3557464)

If an entity type is overridden using a hook_entity_type_alter to use a different class, it was possible to use statically the entity type or the overridden version:

```php
OriginalClass::loadMultiple(); // Ok.
OverrideClass::loadMultiple(); // Ok.
```

But if another module overrides again the entity type class, then the static calls of the first override would not work:

```php
Original::loadMultiple(); // Ok.
Override::loadMultiple(); // Error.
AnotherOverride::loadMultiple(); // Ok.
```

Now it is possible to override an entity type class multiple times without issue in the entity type manager finding the correct class to load.

A new `getDecoratedClasses` method had been added in case your code needs to check for an entity type class.

**Before:**

```php
$entity_type->getOriginalClass() == $class_name
```

**After:**

```php
in_array($class_name, $entity_type->getDecoratedClasses(), TRUE)
```

The new method allows to support any number of overrides.

*Source: [Static calls to overridden entity type will still work if the entity type is overridden another time](https://www.drupal.org/node/3557464), a Drupal core change record by [grimreaper](https://www.drupal.org/user/2388214) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
