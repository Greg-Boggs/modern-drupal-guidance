---
name: block-plugins-can-now-implement-cacheoptionalinterface
title: "Block plugins can now implement CacheOptionalInterface"
description: "Block plugins can now implement CacheOptionalInterface"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3516115
change-record-nid: 3516115
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3500683](https://www.drupal.org/node/3500683)

Block plugins can now indicate that they are very not worth caching by implementing `\Drupal\Core\Cache\CacheOptionalInterface.`

In some cases, loading a cached version of a rendered block may be more expensive than just rendering the block, especially if those blocks also have many variations.

A good example is the language switcher block, that varies for every URL.

This is different from setting max-age 0, which means that the content of a block must not be cached at all. CacheOptionalInterface only applies to to separate block cache, the block may still be cached by the dynamic and anymous page caches for example.

A different system that uses CacheOptionalInterface are access policies, which are often also fast and do not require persistent caching.

#### Related issues

[Support CacheOptionalInterface in BlockViewBuilder, use it in language switcher block to prevent max-age 0 bubbling](https://www.drupal.org/project/drupal/issues/2232375)\
[Add CacheOptionalInterface to more blocks](https://www.drupal.org/project/drupal/issues/3516051)

*Source: [Block plugins can now implement CacheOptionalInterface](https://www.drupal.org/node/3516115), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
