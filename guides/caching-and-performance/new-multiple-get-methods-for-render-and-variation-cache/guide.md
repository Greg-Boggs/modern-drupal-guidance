---
name: new-multiple-get-methods-for-render-and-variation-cache
title: "New multiple get methods for render and variation cache"
description: "New multiple get methods for render and variation cache"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3504958
change-record-nid: 3504958
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3493911](https://www.drupal.org/node/3493911)

New ::getMultiple() methods have been added to `VariationCache` and `RenderCache` to allow multiple render cache items to be fetched at once. These are mostly intended to be used internally by Drupal core to support the new CachedPlaceholderStrategy which immediately replaces render cache placeholders when the placeholder replacement itself is found in the cache.

*Source: [New multiple get methods for render and variation cache](https://www.drupal.org/node/3504958), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
