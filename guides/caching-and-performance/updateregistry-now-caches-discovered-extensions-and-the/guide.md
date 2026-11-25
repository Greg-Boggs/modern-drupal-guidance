---
name: updateregistry-now-caches-discovered-extensions-and-the
title: "UpdateRegistry now caches discovered extensions and the constructor has changed"
description: "UpdateRegistry now caches discovered extensions and the constructor has changed"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3618917
change-record-nid: 3618917
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3303751](https://www.drupal.org/node/3303751)

`UpdateRegistry` now expects a `MemoryCacheInterface` as the 6th parameter.

Before:

```php
public function __construct(
    protected $root,
    protected $sitePath,
    array $module_list,
    protected KeyValueStoreInterface $keyValue,
    ThemeHandlerInterface $theme_handler,
    protected string $updateType = 'post_update',
  )
```

After:

```php
public function __construct(
    protected $root,
    protected $sitePath,
    array $module_list,
    protected KeyValueStoreInterface $keyValue,
    ThemeHandlerInterface $theme_handler,
    MemoryCacheInterface|string|null $memoryCache = NULL,
    protected string $updateType = 'post_update',
  )
```

This change likely only affects Drush or similar projects that directly interact with the update system functionality.

*Source: [UpdateRegistry now caches discovered extensions and the constructor has changed](https://www.drupal.org/node/3618917), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
