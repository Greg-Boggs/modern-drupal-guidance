---
name: css-reset-added-to-navigation-modules-toolbar-and-top-bar
title: "CSS reset added to Navigation module's toolbar and top bar"
description: "CSS reset added to Navigation module's toolbar and top bar"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3560492
change-record-nid: 3560492
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3511280](https://www.drupal.org/node/3511280)

A CSS reset has been added to the Navigation module to prevent front-end theme styles from leaking into the administrative toolbar and top bar. This reset uses the `:is()` pseudo-class to pair the toolbar selector with a non-existent ID, giving the entire selector the specificity of an ID.

Inside the new ruleset, the `all: revert;`declaration resets all descendant elements back to the browser’s default styles. This ensures the toolbar renders consistently regardless of the front-end theme.

```php
:is(#extra-specificity-hack, [data-drupal-admin-styles]) {
  box-sizing: border-box;

  *:not(:where(svg, svg *)) {
    all: revert;
    box-sizing: border-box;

    button {
      font-family: inherit;
    }

    &::after,
    &::before {
      all: revert;
      box-sizing: border-box;
    }
  }
}
```

If a module or theme includes custom styling that targets the top bar, those selectors will need to be updated to use the new, higher-specificity selector.

### **Before**

```php
[data-drupal-admin-styles] {
  .my-button {
    /* Styles */
  }
}
```

### **After**

```php
:is(#extra-specificity-hack, [data-drupal-admin-styles]) {
  .my-button {
    /* Styles */
  }
}
```

*Source: [CSS reset added to Navigation module's toolbar and top bar](https://www.drupal.org/node/3560492), a Drupal core change record by [mherchel](https://www.drupal.org/user/118428) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
