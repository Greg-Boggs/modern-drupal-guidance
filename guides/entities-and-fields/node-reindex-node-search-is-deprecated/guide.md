---
name: node-reindex-node-search-is-deprecated
title: "node_reindex_node_search() is deprecated"
description: "node_reindex_node_search() is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3533632
change-record-nid: 3533632
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3533612](https://www.drupal.org/node/3533612)

The procedural function `node_reindex_node_search()` has been deprecated. Its logic has been moved to `\Drupal\node\NodeSearchHooks` implementation.

If your code directly called `node_reindex_node_search()`, replace it with a call to:

```php
\Drupal::service('search.index')->markForReindex('node_search', $nid);
```

*Source: [node_reindex_node_search() is deprecated](https://www.drupal.org/node/3533632), a Drupal core change record by [virag.jain](https://www.drupal.org/user/3840647) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
