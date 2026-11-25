---
name: image-filter-keyword-is-deprecated
title: "image_filter_keyword() is deprecated"
description: "image_filter_keyword() is deprecated"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3268441
change-record-nid: 3268441
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#2350849](https://www.drupal.org/node/2350849)

`image_filter_keyword()` is deprecated.

Use `\Drupal\Component\Utility\Image::getKeywordOffset()` instead.

Note that if the keyword is not recognized (i.e. not one of 'top', 'bottom', 'center', 'right', 'left'), the new method throws an `InvalidArgumentException` instead of returning the invalid keyword itself.

BEFORE:

```php
  $x = image_filter_keyword($x, $image->getWidth(), $this->configuration['width']);
```

AFTER:

```php
use Drupal\Component\Utility\Image;

...

  $x = Image::getKeywordOffset($x, $image->getWidth(), $this->configuration['width']);

...
```

*Source: [image_filter_keyword() is deprecated](https://www.drupal.org/node/3268441), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
