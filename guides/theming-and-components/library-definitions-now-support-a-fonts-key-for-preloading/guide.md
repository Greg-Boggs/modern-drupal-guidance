---
name: library-definitions-now-support-a-fonts-key-for-preloading
title: "Library definitions now support a fonts key for preloading"
description: "Library definitions now support a fonts key for preloading"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3585574
change-record-nid: 3585574
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3366561](https://www.drupal.org/node/3366561)

Library definitions now support a fonts key, for preloading of fonts.

Previously Drupal did not provide an API for font preloading, although there were patterns such as adding the links manually to the html header template.

Fonts to be preloaded can now be declared at the same level as CSS and JavaScript in the library definition, and a `<link rel="preload"` element will be added to the HTML header programmatically.

Note that setting `preload: false` in a definition is the same as not including a font in the definition, it has no effect.

```php
global-styling:
  version: VERSION
  fonts:
    fonts/metropolis/Metropolis-Regular.woff2:
      preload: true
```

Fonts should be preloaded when they're very likely to block rendering above the fold. See [https://web.dev/learn/performance/optimize-web-fonts](https://web.dev/learn/performance/optimize-web-fonts) for more details

*Source: [Library definitions now support a fonts key for preloading](https://www.drupal.org/node/3585574), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
