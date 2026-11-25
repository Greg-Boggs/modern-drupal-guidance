---
name: filestoragefactory-getsync-replaced-with-get
title: "FileStorageFactory::getSync() replaced with ::get()"
description: "FileStorageFactory::getSync() replaced with ::get()"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3610720
change-record-nid: 3610720
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3591680](https://www.drupal.org/node/3591680)

The static method `FileStorageFactory::getSync()` has been replaced with a non-static method: `FileStorageFactory::get()`. Modules using the factory will need to update service definitions to use the new method:

Before:

```php
    factory: Drupal\Core\Config\FileStorageFactory::getSync
```

After:

```php
    factory: ['@config.file_storage.factory', 'get']
```

*Source: [FileStorageFactory::getSync() replaced with ::get()](https://www.drupal.org/node/3610720), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
