---
name: a-new-entity-links-filter-format-and-ckeditor-5-plugin-has
title: "A new Entity Links Filter format and CKEditor 5 plugin has been added"
description: "A new Entity Links Filter format and CKEditor 5 plugin has been added"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3524296
change-record-nid: 3524296
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3317769](https://www.drupal.org/node/3317769)

An exciting new feature has been added to core, if you've used the [Linkit](https://drupal.org/project/linkit) module this will look very familiar.

![](https://www.drupal.org/files/issues/2024-11-08/linkit-3317769-214.gif)

To enable the Entity Links filter, edit your Text format filters that uses a CKEditor 5 editor and enable the Entity Links filter.

![Entity links filter](https://www.drupal.org/files/Screenshot%20from%202025-05-14%2010-38-50.png)

By default, only Node entities are exposed as link suggestions.

Other entity types can be enabled via `hook_entity_bundle_info_alter`.

For example, you could enable link suggestions for all media and taxonomy bundles like so:

```php
<?php

declare(strict_types=1);

namespace Drupal\my_module\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * Hook implementations for my_module.
 */
class MyModuleHooks {

  /**
   * Implements hook_entity_bundle_info_alter().
   */
  #[Hook('entity_bundle_info_alter')]
  public function entityBundleInfoAlter(array &$bundles): void {
    if (isset($bundles['taxonomy_term'])) {
      foreach ($bundles['taxonomy_term'] as $key => $bundle) {
        $bundles['taxonomy_term'][$key]['ckeditor5_link_suggestions'] = TRUE;
      }
    }

    if (isset($bundles['media'])) {
      foreach ($bundles['media'] as $key => $bundle) {
        $bundles['media'][$key]['ckeditor5_link_suggestions'] = TRUE;
      }
    }
  }

}
```

*Source: [A new Entity Links Filter format and CKEditor 5 plugin has been added](https://www.drupal.org/node/3524296), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
