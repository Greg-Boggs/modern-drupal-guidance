---
name: new-placeholder-strategy-denylist-key-for-render-arrays
title: "New #placeholder_strategy_denylist key for render arrays with lazy builders"
description: "New #placeholder_strategy_denylist key for render arrays with lazy builders"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3511562
change-record-nid: 3511562
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3508299](https://www.drupal.org/node/3508299)

Render arrays that specify a #lazy_builder may now specify a #placeholder_strategy_denylist key at the same level.

This allows placeholders to restrict the strategy that they're replaced by, e.g.

```php
 $build = [
      '#lazy_builder' => [static::class . '::renderMessages', [$element['#display']]],
      '#create_placeholder' => TRUE,
      // Prevent this placeholder being handled by big_pipe.
      '#placeholder_strategy_denylist' => [
        BigPipeStrategy::class => TRUE,
        CachedStrategy::class => TRUE,
      ],
    ];
```

In core this is used to prevent the messages block, which shows on every page in most configurations and is very cheap to render, from being rendered by big pipe, so that it is possible to skip loading big pipe's JavaScript when it is otherwise the only placeholder on the page. In general, the key can be skipped for most situations and the most appropriate render strategy will be selected.

*Source: [New #placeholder_strategy_denylist key for render arrays with lazy builders](https://www.drupal.org/node/3511562), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
