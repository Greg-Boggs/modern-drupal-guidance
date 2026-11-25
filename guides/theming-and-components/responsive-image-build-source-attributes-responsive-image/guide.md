---
name: responsive-image-build-source-attributes-responsive-image
title: "_responsive_image_build_source_attributes(), responsive_image_get_image_dimensions(), responsive_image_get_mime_type(), _responsive_image_image_style_url() replaced with ResponsiveImageBuilder"
description: "_responsive_image_build_source_attributes(), responsive_image_get_image_dimensions(), responsive_image_get_mime_type(), _responsive_image_image_style_url() replaced with ResponsiveImageBuilder"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3548329
change-record-nid: 3548329
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3548326](https://www.drupal.org/node/3548326)

The following functions are replaced with methods on the class/service `\Drupal\responsive_image\ResponsiveImageBuilder`

| Before | After |
| --- | --- |
| `_responsive_image_build_source_attributes()` | `\Drupal::service(ResponsiveImageBuilder::class)->buildSourceAttributes()` |
| `responsive_image_get_image_dimensions()` | `\Drupal::service(ResponsiveImageBuilder::class)->getImageDimensions()` |
| `responsive_image_get_mime_type()` | `\Drupal::service(ResponsiveImageBuilder::class)->getMimeType()` |
| `_responsive_image_image_style_url()` | `\Drupal::service(ResponsiveImageBuilder::class)->getImageStyleUrl()` |

*Source: [\_responsive_image_build_source_attributes(), responsive_image_get_image_dimensions(), responsive_image_get_mime_type(), \_responsive_image_image_style_url() replaced with ResponsiveImageBuilder](https://www.drupal.org/node/3548329), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
