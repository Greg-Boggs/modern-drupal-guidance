---
name: layout-builder-storage-plugins-must-implement
title: "Layout Builder storage plugins must implement SupportAwareSectionStorageInterface"
description: "Layout Builder storage plugins must implement SupportAwareSectionStorageInterface"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3574738
change-record-nid: 3574738
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3574461](https://www.drupal.org/node/3574461), [#3060985](https://www.drupal.org/node/3060985)

To optimize performance, section storage plugins must support `\Drupal\layout_builder\SupportAwareSectionStorageInterface`

Be aware that section storage plugins not working with entities, such as navigation.module, can unconditionally return FALSE.

```php
  /**
   * {@inheritdoc}
   */
  public function isSupported(string $entity_type_id, string $bundle, string $view_mode): bool {
    // Navigation section storage does not support any entity type.
    return FALSE;
  }
```

*Source: [Layout Builder storage plugins must implement SupportAwareSectionStorageInterface](https://www.drupal.org/node/3574738), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
