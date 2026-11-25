---
name: using-item-attributes-with-image-formatter-and-responsive
title: "Using #item_attributes with image_formatter and responsive_image_formatter is deprecated"
description: "Using #item_attributes with image_formatter and responsive_image_formatter is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3554585
change-record-nid: 3554585
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3554447](https://www.drupal.org/node/3554447)

A few theme hooks used an `item_attributes` property instead of using the standard `attributes`.

To avoid special case handling, those theme hooks now use `attributes`.

**Before:**

```php
      $elements[$delta] = [
        '#theme' => 'image_formatter',
        '#item_attributes' => [
          'loading' => $this->getSetting('image_loading')['attribute'],
        ],
        ...
      ];

      $elements[$delta] = [
        '#theme' => 'responsive_image_formatter',
        '#item_attributes' => $item_attributes,
        ...
      ];
```

**After:**

```php
      $elements[$delta] = [
        '#theme' => 'image_formatter',
        '#attributes' => [
          'loading' => $this->getSetting('image_loading')['attribute'],
        ],
        ...
      ];

      $elements[$delta] = [
        '#theme' => 'responsive_image_formatter',
        '#attributes' => $item_attributes,  // Variable $item_attributes not renamed for easier comparison.
        ...
      ];
```

*Source: [Using #item_attributes with image_formatter and responsive_image_formatter is deprecated](https://www.drupal.org/node/3554585), a Drupal core change record by [grimreaper](https://www.drupal.org/user/2388214) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
