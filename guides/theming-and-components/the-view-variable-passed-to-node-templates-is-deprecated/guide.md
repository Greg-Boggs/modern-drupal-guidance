---
name: the-view-variable-passed-to-node-templates-is-deprecated
title: "The view variable passed to node templates is deprecated"
description: "The view variable passed to node templates is deprecated"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3459903
change-record-nid: 3459903
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3458608](https://www.drupal.org/node/3458608)

The `view` variable is not safe to use in node templates as no cacheability metadata is provided for it. The template may be built for a certain view and a cached response is returned for a different view. It must not be relied upon. Hence, the `view` variable passed to the node templates as `$variables['view']` is deprecated in 11.1.0 and will be removed in 12.0.0.

This change aims to streamline the theming process and ensure consistency across node templates.

*Source: [The view variable passed to node templates is deprecated](https://www.drupal.org/node/3459903), a Drupal core change record by [nishtha.pradhan](https://www.drupal.org/user/3666936) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
