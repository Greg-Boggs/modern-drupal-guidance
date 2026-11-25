---
name: imagestyle-getreplacementid-is-deprecated
title: "ImageStyle::getReplacementID is deprecated"
description: "ImageStyle::getReplacementID is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3520914
change-record-nid: 3520914
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3498540](https://www.drupal.org/node/3498540)

`\Drupal\image\Entity\ImageStyle::getReplacementID()` is deprecated in Drupal 11.3.0 and will be removed in Drupal 12.0.0.

There appears to be no usage of the method so no direct replacement for this method is provided. If needed call `getReplacementId()` on the entity storage class.

Before:

```php
$replacement_id = $image_style->getReplacementId();
```

After:

```php
$storage = \Drupal::entityTypeManager()->getStorage($image_style->getEntityTypeId());
$replacement_id = $storage->getReplacementId($image_style->id());
```

*Source: [ImageStyle::getReplacementID is deprecated](https://www.drupal.org/node/3520914), a Drupal core change record by [shalini_jha](https://www.drupal.org/user/3675486) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
