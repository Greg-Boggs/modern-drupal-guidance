---
name: node-search-plugin-node-search-moved-to-sub-module-search
title: "Node search plugin node_search moved to sub-module Search Node in Search"
description: "Node search plugin node_search moved to sub-module Search Node in Search"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3590298
change-record-nid: 3590298
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3587564](https://www.drupal.org/node/3587564)

The plugin `node_search` is now in the new sub-module of the Search module, `search_node`.

Any class extending `\Drupal\node\Plugin\Search\NodeSearch` should change to extending `\Drupal\search_node\Plugin\Search\SearchNode`

*Source: [Node search plugin node_search moved to sub-module Search Node in Search](https://www.drupal.org/node/3590298), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
