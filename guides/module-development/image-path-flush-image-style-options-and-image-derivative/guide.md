---
name: image-path-flush-image-style-options-and-image-derivative
title: "image_path_flush(), image_style_options() and IMAGE_DERIVATIVE_TOKEN have been deprecated"
description: "image_path_flush(), image_style_options() and IMAGE_DERIVATIVE_TOKEN have been deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3567619
change-record-nid: 3567619
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3567618](https://www.drupal.org/node/3567618)

The constant `IMAGE_DERIVATIVE_TOKEN` has been deprecated. Use `ImageStyleInterface::TOKEN` instead.

`image_path_flush()` and `image_style_options()` have both been deprecated. See below for replacements.

**Before:**

```php
image_path_flush();
```

**After:**

```php
use Drupal\image\ImageDerivativeUtilities;

\Drupal::service(ImageDerivativeUtilities::class)->pathFlush();
```

**Before:**

```php
image_style_options();
```

**After:**

```php
use Drupal\image\ImageDerivativeUtilities;

\Drupal::service(ImageDerivativeUtilities::class)->styleOptions();
```

*Source: [image_path_flush(), image_style_options() and IMAGE_DERIVATIVE_TOKEN have been deprecated](https://www.drupal.org/node/3567619), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
