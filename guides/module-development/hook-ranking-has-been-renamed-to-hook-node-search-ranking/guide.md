---
name: hook-ranking-has-been-renamed-to-hook-node-search-ranking
title: "hook_ranking() has been renamed to hook_node_search_ranking()"
description: "hook_ranking() has been renamed to hook_node_search_ranking()"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/2690393
change-record-nid: 2690393
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#1019966](https://www.drupal.org/node/1019966)

`hook_ranking()` has been deprecated in Drupal 11.3

The hook has been renamed to `hook_node_search_ranking()`, and it works exactly the same. Until Drupal 12, both hooks will be supported.

**Before**

```php
<?php
/**
 * Implements hook_ranking().
 */
#[Hook('ranking')]
public function ranking(): array {
  ...
}
?>
```

**After**

```php
<?php
/**
 * Implements hook_node_search_ranking().
 */
#[Hook('node_search_ranking')]
public function ranking(): array {
  // Same function body as before; just change the function name.
}
?>
```

*Source: [hook_ranking() has been renamed to hook_node_search_ranking()](https://www.drupal.org/node/2690393), a Drupal core change record by [leolandotan](https://www.drupal.org/user/2804853) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
