---
name: classloader-with-support-for-moving-deprecating-classes
title: "Classloader with support for moving/deprecating classes"
description: "Classloader with support for moving/deprecating classes"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3509577
change-record-nid: 3509577
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3502882](https://www.drupal.org/node/3502882)

A new API and associated classloader has been added to enable renaming classes in the code base.

This allows classes to be renamed or moved to different namespaces, without having to leave the old class in the code base, only the services.yml entries are required.

`module.services.yml` now supports a `moved_classes` parameter. This specifies the old and new class, with optional deprecation suppport.

Without deprecation:

```php
parameters:
  core.moved_classes:
    'Drupal\Core\StringTranslation\TranslationWrapper':
      class: 'Drupal\Core\StringTranslation\TranslatableMarkup'
```

With deprecation:

```php
parameters:
  module_autoload_test.moved_classes:
    'Drupal\module_autoload_test\Foo':
      class: 'Drupal\module_autoload_test\Bar'
      deprecation_version: drupal:11.2.0
      removed_version: drupal:12.0.0
      change_record: https://www.drupal.org/project/drupal/issues/3502882
```

When the old class is autoloaded, the classloader will detect this, and swap it for the new one using class_alias(). When the deprecation-related keys are specified, the classloader will trigger `E_USER_DEPRECATED` with a message.

The non-deprecation version should only be used where there is a specific reason to leave the alias permanently, for example if the class is used in serialized data which cannot be easily updated.

*Source: [Classloader with support for moving/deprecating classes](https://www.drupal.org/node/3509577), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
