---
name: core-library-definitions-support-before-after-ordering
title: "Core library definitions support before/after ordering"
description: "Core library definitions support before/after ordering"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3467489
change-record-nid: 3467489
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#1945262](https://www.drupal.org/node/1945262)

Where a library needs to be loaded explicitly before or after another library, regardless of dependencies, the new 'before' and 'after' keys can be used.

#### Example

```php
before_main:
  js:
    before_main.js: {}
  before:
    - common_test/main

main:
  js:
    main.js: {}

after_main:
  js:
    after_main.js: {}
  after:
    - common_test/main
```

By using this, library order can be modified without having to force a dependency, which can lead to unnecessary library loading if used purely to affect loading order.

Custom weights for individual files are now discouraged in favor of this new method, and may be deprecated in a future release.

*Source: [Core library definitions support before/after ordering](https://www.drupal.org/node/3467489), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
