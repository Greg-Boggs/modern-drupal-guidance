---
name: 11-2-update-of-prettier-postcss-stylelint-dropped-use-of
title: "11.2 update of prettier/PostCSS/stylelint dropped use of @nest and rgba()"
description: "11.2 update of prettier/PostCSS/stylelint dropped use of @nest and rgba()"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3530572
change-record-nid: 3530572
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3523078](https://www.drupal.org/node/3523078)

PostCSS and its plugins has been updated to the latest version, removing the need for the `@nest` keyword and removing the use of `rgba()`. Drupal maintains the 2021 nesting behavior to avoid adding `:is()` selectors throughout the CSS. For details, see the PostCSS Nesting plugin documentation.

### Removal of `@nest`

#### Before

```php
@nest .touchevents & .draggable td {
    padding: 0 10px;
  }
```

#### After

```php
.touchevents & .draggable td {
    padding: 0 10px;
  }
```

Stylelint and `stylelint-config-standard` have also been updated to the latest version. Most notably the CSS `rgb()` function is preferred over the equivalent `rgba()` function. Drupal core stylesheets have been updated to account for these changed standards.

### Using `rgb()` instead of `rgba()`

#### Before

```php
#drupal-off-canvas-wrapper {
  --off-canvas-wrapper-box-shadow: 0 0 0.25rem 2px rgba(0, 0, 0, 0.3);
  --off-canvas-wrapper-border-color: #2d2d2d;
  --off-canvas-wrapper-border-width: 1px;
```

#### After

```php
#drupal-off-canvas-wrapper {
  --off-canvas-wrapper-box-shadow: 0 0 0.25rem 2px rgb(0, 0, 0, 0.3);
  --off-canvas-wrapper-border-color: #2d2d2d;
  --off-canvas-wrapper-border-width: 1px;
```

*Source: [11.2 update of prettier/PostCSS/stylelint dropped use of @nest and rgba()](https://www.drupal.org/node/3530572), a Drupal core change record by [smustgrave](https://www.drupal.org/user/3252890) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
