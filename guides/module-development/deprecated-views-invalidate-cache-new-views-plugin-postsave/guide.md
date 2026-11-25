---
name: deprecated-views-invalidate-cache-new-views-plugin-postsave
title: "Deprecated views_invalidate_cache, new Views plugin postSave API introduced"
description: "Deprecated views_invalidate_cache, new Views plugin postSave API introduced"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3584050
change-record-nid: 3584050
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#941970](https://www.drupal.org/node/941970)

`views_invalidate_cache()` has been deprecated. Use `Views::invalidateCache()` for cache invalidation. For route rebuilding, call the `router.builder` and `views.route_subscriber` services directly. If those operations need to be done in a Views plugin context, the following applies:

Plugins, handlers and displays can now implement `PostSaveViewInterface` to act on view save: `View::postSave()` calls `postSaveView(PostSaveProcess $postSaveProcess, ?DisplayPluginInterface $original_display)` on every plugin that implements the interface.

`PostSaveProcess` tracks post-save state:

`setRouterRebuild()`: flag that the router needs rebuilding.\
`needsRouterRebuild()`: check if router needs rebuilding - `View::postSave()` rebuilds it once if needed.

`addDiscoveryToClear():` queue a `CachedDiscoveryInterface` plugin manager to have its `clearCachedDefinitions()` called.

*Source: [Deprecated views_invalidate_cache, new Views plugin postSave API introduced](https://www.drupal.org/node/3584050), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
