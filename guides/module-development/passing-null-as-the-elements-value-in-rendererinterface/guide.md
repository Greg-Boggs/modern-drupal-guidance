---
name: passing-null-as-the-elements-value-in-rendererinterface
title: "Passing NULL as the $elements value in RendererInterface::render() is deprecated"
description: "Passing NULL as the $elements value in RendererInterface::render() is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3534020
change-record-nid: 3534020
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3524738](https://www.drupal.org/node/3524738)

Passing `NULL` as the value for the `$elements ` parameter in `RendererInterface::render()` is deprecated in Drupal 11.2.3 and will not be supported in Drupal 12.0.0.

Type declarations will be added to the $element parameter in the method signature in Drupal 12.0.0, so that it will look like this:\
`public function render(array &$elements)`

Note that the `$is_root_call` parameter was previously deprecated in 11.2.0 and will be removed in Drupal 12.0.0. See this [change record](https://www.drupal.org/node/3497318).

*Source: [Passing NULL as the $elements value in RendererInterface::render() is deprecated](https://www.drupal.org/node/3534020), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
