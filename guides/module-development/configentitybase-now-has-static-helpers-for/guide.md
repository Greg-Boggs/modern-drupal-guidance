---
name: configentitybase-now-has-static-helpers-for
title: "ConfigEntityBase now has static helpers for loadOverrideFree and loadMultipleOverrideFree"
description: "ConfigEntityBase now has static helpers for loadOverrideFree and loadMultipleOverrideFree"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3620269
change-record-nid: 3620269
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3620216](https://www.drupal.org/node/3620216)

`ConfigEntityBase` now has two new static helpers to load override free versions of their entities.

`ConfigEntityBase::loadOverrideFree`\
`ConfigEntityBase::loadMultipleOverrideFree`

These will load config entities without overrides (no translations, per domain or other contextual changes) and should be used whenever a config entity is loaded for the purpose of editing/saving.

```php
$role = Role::loadOverrideFree($id);
$role->grantPermission('access content');
$role->save();
```

This is equivalent to the existing method on config entity storage:

```php
$storage = \Drupal::entityTypeManager()->getStorage('role');
assert($storage instanceof ConfigEntityStorageInterface);
$role = $storage->loadOverrideFree($id);
$role->grantPermission('access content');
$role->save();
```

The new method is recommended for test code and other places that do not require or can not use dependency injection.

Internally, this uses `ConfigFactory::getEditable()` and is the same concept.

*Source: [ConfigEntityBase now has static helpers for loadOverrideFree and loadMultipleOverrideFree](https://www.drupal.org/node/3620269), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
