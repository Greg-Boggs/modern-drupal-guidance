---
name: template-preprocess-removed-and-inlined-into-thememanager
title: "template_preprocess() removed and inlined into ThemeManager"
description: "template_preprocess() removed and inlined into ThemeManager"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3500806
change-record-nid: 3500806
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2340341](https://www.drupal.org/node/2340341)

template_preprocess(), together with the internal function \_template_preprocess_default_variables() and template_preprocess_default_variables hook it invokes has been inlined into the ThemeManager.

Previously, it was discovered and added to each theme definition as the very first preprocess function, it is now automatically and always applied to any element being rendered. This makes it more reliable and reduces the size of the theme registry.

Nothing in regards to the functionality it provides changes within other preprocess functions and twig templates.

To provide backwards compatibility for calls to template_preprocess(), there is a public getDefaultTemplateVariables() method on ThemeManager, this is marked internal, neither this nor template_preprocess() must be called directly.

For implementations that used `drupal_static_reset('_template_preprocess_default_variables')` to reset statically cached default variables, `\Drupal::service('theme.manager')->resetActiveTheme()` can be called.

*Source: [template_preprocess() removed and inlined into ThemeManager](https://www.drupal.org/node/3500806), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
