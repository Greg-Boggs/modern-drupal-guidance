---
name: new-blockplugininterface-createplaceholder-method
title: "New BlockPluginInterface::createPlaceholder() method"
description: "New BlockPluginInterface::createPlaceholder() method"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3512518
change-record-nid: 3512518
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3437499](https://www.drupal.org/node/3437499)

A new ::createPlaceholder() method has been added to BlockPluginInterface:

```php
 /**
   * Whether to render blocks in a placeholder.
   *
   * When blocks of this type are rendered, indicate whether they should be
   * rendered in a placeholder or not. In general, blocks that attach libraries
   * and/or render entities should be placeholdered to optimize various aspects
   * of rendering performance.
   *
   * @return bool
   *   Whether to placeholder blocks of this plugin type.
   */
  public function createPlaceholder(): bool;
```

Blocks are [already placeholdered implicitly if they specify particular cache metadata](https://www.drupal.org/docs/drupal-apis/render-api/auto-placeholdering). This new method allows blocks to specify that they should always be placeholdered regardless of cache metadata.

Several core block plugins have been set to placeholder.

This change should immediately enable higher cache rates for some dynamic page cache items, because high-invalidation cache tags may no longer be attached to the dynamic page cache entry and instead will only affect the individual placeholder. It also allows responses served by Drupal's big pipe module to handle more of the page with big pipe.

*Source: [New BlockPluginInterface::createPlaceholder() method](https://www.drupal.org/node/3512518), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
