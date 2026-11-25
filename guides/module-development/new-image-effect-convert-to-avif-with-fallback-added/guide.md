---
name: new-image-effect-convert-to-avif-with-fallback-added
title: "New image effect, Convert to AVIF (with fallback), added"
description: "New image effect, Convert to AVIF (with fallback), added"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3511540
change-record-nid: 3511540
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3510582](https://www.drupal.org/node/3510582)

Since [GDToolkit supports AVIF image format](https://www.drupal.org/node/3348348), servers that have AVIF support can create AVIF image derivatives. Since we can't guarantee support on all configurations we can't use AVIF as the default format.

A new image conversion effect has been added that converts to AVIF on servers that support it, but allows a fallback image style (such as WEBP) when AVIF is not available.

*Source: [New image effect, Convert to AVIF (with fallback), added](https://www.drupal.org/node/3511540), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
