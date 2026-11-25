---
name: library-definitions-support-specifying-aggregate-targets
title: "Library definitions support specifying aggregate targets"
description: "Library definitions support specifying aggregate targets"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3585548
change-record-nid: 3585548
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3565258](https://www.drupal.org/node/3565258)

Drupal's library definitions support specifying an aggregate target via `aggregate_target`.

When a library contains multiple files, it can be more efficient to serve a single aggregate for that library instead of combining it with other libraries. This improves CDN and browser cache hit rates when different combinations of libraries are attached on different pages, because the per-library aggregates are always the same across pages.

There are two ways to use this:

For a library with large or several files that is likely to be shown on every page, set aggregate_target for the asset type to true, for example:

```php
global-styling:
  aggregate_target:
    css: true
  version: VERSION
  css:
    base:
```

For libraries that are always attached together due to dependencies, an arbitrary string can be provide to allow libraries to target the same aggregate.

```php
drupal:
  aggregate_target:
    css: 'drupal'
  version: VERSION
  js:
    misc/drupal.js: { weight: -18 }
@@ -362,6 +363,7 @@ drupal:
    suppressDeprecationErrors: true

drupalSettings:
  aggregate_target:
    css: 'drupal'
  version: VERSION
  js:
```

Note that when individual file weights or similar issues cause libraries to be 'split' across multiple aggregates, the aggregate target will be ignored to preserve correct ordering. It's highly recommended to manually test the number of aggregate files per page on multiple different pages when implementing this feature.

*Source: [Library definitions support specifying aggregate targets](https://www.drupal.org/node/3585548), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
