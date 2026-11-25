---
name: navigation-modules-toolbar-and-top-bar-css-reset-changed
title: "Navigation module's toolbar and top bar CSS reset changed from :is to :where"
description: "Navigation module's toolbar and top bar CSS reset changed from :is to :where"
drupal-core: ">=11.3.3"
source-url: https://www.drupal.org/node/3622520
change-record-nid: 3622520
introduced-in-version: "11.3.3"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.3\
Issue links: [#3565213](https://www.drupal.org/node/3565213)

The selector for CSS reset preventing front-end theme styles from leaking into the administrative toolbar and top bar has been changed from the `:is()` pseudo-class to `:where()`. Because `:where()` has a lower specificity value of 0 compared to `:is(#extra-specificity-hack)`, custom styling from modules or themes that previously were not applied because of specificity may now leak into the toolbar and top bar.

*Source: [Navigation module's toolbar and top bar CSS reset changed from :is to :where](https://www.drupal.org/node/3622520), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
