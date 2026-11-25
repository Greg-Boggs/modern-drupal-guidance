---
name: constructor-property-promotion-across-drupal-core
title: "Constructor property promotion across Drupal core"
description: "Constructor property promotion across Drupal core"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3635267
change-record-nid: 3635267
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3278431](https://www.drupal.org/node/3278431)

All candidates for constructor property promotion in Drupal core have been converted via rector.

For the vast majority of code, there should be no backwards compatibility break. However, if tests or similar code are manually constructing a class using named arguments, it may be necessary to update in the case that an argument has been changed from `snake_case` to `camelCase`.

*Source: [Constructor property promotion across Drupal core](https://www.drupal.org/node/3635267), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
