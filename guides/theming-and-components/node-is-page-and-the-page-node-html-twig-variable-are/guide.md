---
name: node-is-page-and-the-page-node-html-twig-variable-are
title: "node_is_page and the page node.html.twig variable are deprecated"
description: "node_is_page and the page node.html.twig variable are deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3458593
change-record-nid: 3458593
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3458589](https://www.drupal.org/node/3458589)

The 'page' variable for node.html.twig is deprecated, the 'full' view mode can be checked instead.

This results in a consistent behavior of the full view mode, which will no longer display the node title. This may result in some unexpected behavior if sites used views, formatters or custom code that relied on this behavior. It also fixes several bugs with missing or duplicated page titles, for example on the revision page.

Additionally, the node_is_page() procedural function is also deprecated.

*Source: [node_is_page and the page node.html.twig variable are deprecated](https://www.drupal.org/node/3458593), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
