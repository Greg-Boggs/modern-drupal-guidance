---
name: backwards-compatibility-layer-for-views-ui-css-classes
title: "Backwards compatibility layer for views UI CSS classes moved to Stable9"
description: "Backwards compatibility layer for views UI CSS classes moved to Stable9"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3410394
change-record-nid: 3410394
introduced-in-version: "11.0.0"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0\
Issue links: [#2977950](https://www.drupal.org/node/2977950)

Views used to duplicate custom classes like `my__class` added in the views UI into an additional `my--class` as a backwards compatibility layer.

This backwards compatibility layer has now been moved to the Stable9 theme. If you were relying on these classes, you should either update your CSS to target the correct class, or add Stable9 as a dependency of your theme

Recommendation is to target correct CSS classes.

*Source: [Backwards compatibility layer for views UI CSS classes moved to Stable9](https://www.drupal.org/node/3410394), a Drupal core change record by [smustgrave](https://www.drupal.org/user/3252890) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
