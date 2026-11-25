---
name: defining-theme-file-for-views-plugins-with-a-theme-key-in
title: "Defining theme_file for views plugins with a theme key in their plugin definition is deprecated"
description: "Defining theme_file for views plugins with a theme key in their plugin definition is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3548325
change-record-nid: 3548325
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3535680](https://www.drupal.org/node/3535680)

Views plugins were able to specify a theme_file key in their plugin annotation to indicate an include file that contained their preprocess functions.

Since template preprocess callbacks are now explicitly registered in the [hook_theme definition](https://www.drupal.org/node/3504125) and [views theme hooks defined for plugins support a standard preprocess callback](https://www.drupal.org/node/3548185), this key is deprecated.

The theme_file key is already not available in plugin attributes and support for it is removed in Drupal 12.0. As a minimal conversion, the functions can be moved to the .module file, or converted to the recommended OOP format.

*Source: [Defining theme_file for views plugins with a theme key in their plugin definition is deprecated](https://www.drupal.org/node/3548325), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
