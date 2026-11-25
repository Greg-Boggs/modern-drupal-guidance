---
name: the-path-alias-preload-cache-has-been-removed
title: "The path alias preload cache has been removed"
description: "The path alias preload cache has been removed"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3532412
change-record-nid: 3532412
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3496369](https://www.drupal.org/node/3496369)

The path alias preload cache was an optimization added in Drupal 6 which kept a cache of system paths per page for 24 hours, in order to load any path aliases in a single query rather than one by one.

This cache was less effective in modern Drupal versions due to render caching improvements, which mean that once render caches are warmed, path aliases are not looked up anyway or only a small subset of them.

From Drupal 11.3 this cache has been removed entirely from the AliasManager class. Modules that directly integrating with the path alias cache can remove any integration once they require Drupal 11.3 or higher.

Path alias preloading has been re-implemented via an alternative mechanism which uses PHP Fibers - when path aliases are requested within a Fiber, they will be added to a list of path aliases to preload, and then when the fiber is resumed, any aliases requested up until that point from other Fibers will be loaded at once. This can dramatically reduce the number of path alias lookups on cold caches, which the previous approach was unable to improve.

Contrib and custom modules may want to ensure their blocks or other rendered elements are correctly using placeholders and #lazy_builders in order to take full advantage of this and other performance improvements. See for example [https://www.drupal.org/node/3512518](https://www.drupal.org/node/3512518)

*Source: [The path alias preload cache has been removed](https://www.drupal.org/node/3532412), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
