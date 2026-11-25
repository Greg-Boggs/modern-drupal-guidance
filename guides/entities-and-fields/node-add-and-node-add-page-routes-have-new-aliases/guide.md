---
name: node-add-and-node-add-page-routes-have-new-aliases
title: "node.add and node.add_page routes have new aliases"
description: "node.add and node.add_page routes have new aliases"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3555319
change-record-nid: 3555319
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2723579](https://www.drupal.org/node/2723579)

As part of standardising Node route generation, `\Drupal\node\Entity\NodeRouteProvider` now extends `\Drupal\Core\Entity\Routing\DefaultHtmlRouteProvider\DefaultHtmlRouteProvider`.

To maintain backwards compatibility, the `node.add` and `node.add_page` routes still exist, and the forwards compatible routes are now aliases of them.

The `entity.node.add_form` route is now an alias of `node.add`.

The `entity.node.add_page` route is now an alias of `node.add_page`.

In future versions of Drupal, `node.add` and `node.add_page` will be deprecated.

*Source: [node.add and node.add_page routes have new aliases](https://www.drupal.org/node/3555319), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
