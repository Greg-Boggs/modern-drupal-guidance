---
name: drupal-supports-several-additional-hook-implementations
title: "Drupal supports several additional hook implementations using #Hook"
description: "Drupal supports several additional hook implementations using #Hook"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3486506
change-record-nid: 3486506
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3486462](https://www.drupal.org/node/3486462)

These hooks now support OOP implementations:

- hook_module_preinstall
- hook_module_preuninstall
- hook_modules_installed
- hook_modules_uninstalled
- hook_cache_flush

Before:

```php
/**
* Implements hook_cache_flush().
*/
function customModule_cache_flush(): void {
  // Custom code
}
```

After:

```php
/**
* Implements hook_cache_flush().
*/
#[Hook('cache_flush')]
public function cacheFlush(): void {
  // Custom code
}
```

*Source: [Drupal supports several additional hook implementations using #Hook](https://www.drupal.org/node/3486506), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
