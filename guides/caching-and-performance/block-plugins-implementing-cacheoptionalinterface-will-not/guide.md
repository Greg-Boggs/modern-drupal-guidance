---
name: block-plugins-implementing-cacheoptionalinterface-will-not
title: "Block plugins implementing CacheOptionalInterface will not have their own render cache entries"
description: "Block plugins implementing CacheOptionalInterface will not have their own render cache entries"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3554070
change-record-nid: 3554070
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2232375](https://www.drupal.org/node/2232375)

Block plugin classes can implement `Drupal\Core\Cache\CacheOptionalInterface` so that when block entities using those plugins are rendered, those blocks will not have their own entries in the render cache.

While such blocks themselves are not render cached, implementing `CacheOptionalInterface` differs from setting the cache max-age of the block to 0 in that the 0 max-age bubbles to wrapping render elements and prevents the page containing the block from being cached in the dynamic page cache. A `CacheOptionalInterface` block in a page will allow that page to be cached in the dynamic page cache.

If a block plugin implements `CacheOptionalInterface`, and its `createPlaceholder() ` method returns `TRUE`, then when rendered, the block will be placeholdered with the appropriate cache metadata and without an entry in the render cache. Cache contexts for the block will not bubble to the dynamic page cache, and the cached markup in the dynamic page cache entry contains the non-replaced placeholder markup.

For example, the language switcher block (`Drupal\language\Plugin\Block\LanguageBlock`) implements `CacheOptionalInterface`, and its `createPlaceholder() ` method returns `TRUE`. This means that individual pages containing the language switcher block can be cached in the dynamic page cache, and the language switcher block variations by cache contexts (for example, query parameters) for this will not result in multiple dynamic page cache entries for the page.

Note that if a language switcher block or similar is placed in a node layout via layout builder, or otherwise rendered inside another render element that has its own render cache entries, then there could possibly be multiple cache entries for that wrapping render element based on cache contexts bubbled up from the block.

*Source: [Block plugins implementing CacheOptionalInterface will not have their own render cache entries](https://www.drupal.org/node/3554070), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
