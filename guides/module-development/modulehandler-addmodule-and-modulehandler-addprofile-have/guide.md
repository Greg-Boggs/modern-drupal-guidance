---
name: modulehandler-addmodule-and-modulehandler-addprofile-have
title: "ModuleHandler::addModule and ModuleHandler::addProfile have been deprecated"
description: "ModuleHandler::addModule and ModuleHandler::addProfile have been deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3491200
change-record-nid: 3491200
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3481778](https://www.drupal.org/node/3481778)

ModuleHandler::addModule and ModuleHandler::addProfile have been deprecated and will be removed in Drupal 12.

There is no direct replacement.\
These methods do not gather OOP hooks as OOP hooks require a container rebuild.

Adding modules or profiles run time is not supported.

**Before:**

```php
\Drupal::service('module_handler')->addModule(['module_name']);
\Drupal::service('module_handler')->addProfile('profile_name', $install_state['profiles']['profile_name']->getPath());
```

**After:**

```php
\Drupal::service('module_installer')->install(['module_name']);
\Drupal::service('module_installer')->install('profile_name', $install_state['profiles']['profile_name']->getPath());
```

*Source: [ModuleHandler::addModule and ModuleHandler::addProfile have been deprecated](https://www.drupal.org/node/3491200), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
