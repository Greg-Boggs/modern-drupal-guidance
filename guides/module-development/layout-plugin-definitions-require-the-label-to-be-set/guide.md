---
name: layout-plugin-definitions-require-the-label-to-be-set
title: "Layout plugin definitions require the label to be set"
description: "Layout plugin definitions require the label to be set"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3464076
change-record-nid: 3464076
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3463592](https://www.drupal.org/node/3463592)

Layout plugin definitions require a label to be set, either directly through the plugin `label` property, or through a deriver. Having the label set in the plugin definition will enforced in Drupal 12.0.0.

The layout plugin category key is also required. If the category is missing, then one will be assigned automatically by `LayoutPluginManager` equal to the plugin provider's name.

*Source: [Layout plugin definitions require the label to be set](https://www.drupal.org/node/3464076), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
