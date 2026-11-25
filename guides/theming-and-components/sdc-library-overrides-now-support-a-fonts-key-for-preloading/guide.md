---
name: sdc-library-overrides-now-support-a-fonts-key-for-preloading
title: "SDC library overrides now support a fonts key for preloading"
description: "SDC library overrides now support a fonts key for preloading"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3588509
change-record-nid: 3588509
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3586470](https://www.drupal.org/node/3586470)

Similar to [https://www.drupal.org/node/3585574](https://www.drupal.org/node/3585574).

Now this support is also added to `libraryOverrides` inside component definition:

```php
libraryOverrides:
  ...
  fonts:
    component-font.woff2:
      preload: true
```

*Source: [SDC library overrides now support a fonts key for preloading](https://www.drupal.org/node/3588509), a Drupal core change record by [grimreaper](https://www.drupal.org/user/2388214) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
