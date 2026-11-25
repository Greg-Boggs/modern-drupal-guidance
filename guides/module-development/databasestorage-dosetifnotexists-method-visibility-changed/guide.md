---
name: databasestorage-dosetifnotexists-method-visibility-changed
title: "DatabaseStorage::doSetIfNotExists() method visibility changed to protected"
description: "DatabaseStorage::doSetIfNotExists() method visibility changed to protected"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3485431
change-record-nid: 3485431
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3485410](https://www.drupal.org/node/3485410)

The `Drupal\Core\KeyValueStore\DatabaseStorage::doSetIfNotExists()` method visibility has been changed from `public` to `protected` to better reflect its internal implementation nature.

Custom and contrib modules may need following changes is they override the method

If you were using `doSetIfNotExists()` directly, use the public `setIfNotExists()` method instead:

**Before:**

```php
$storage->doSetIfNotExists('key', 'value');
```

**After:**

```php
$storage->setIfNotExists('key', 'value');
```

*Source: [DatabaseStorage::doSetIfNotExists() method visibility changed to protected](https://www.drupal.org/node/3485431), a Drupal core change record by [andypost](https://www.drupal.org/user/118908) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
