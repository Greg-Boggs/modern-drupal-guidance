---
name: route-preloading-caching-changes
title: "Route preloading/caching changes"
description: "Route preloading/caching changes"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3589089
change-record-nid: 3589089
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3503843](https://www.drupal.org/node/3503843)

The internal route-by-name-lookup cache is changed to use a new dedicated fast-chained cache bin "routes", that caches all requested routes in APCu if available. It is recommended that especially larger sites monitor their APCu usage and expunge and consider increasing the available apcu memory to account for this.

Before 11.4, Drupal core contained a RoutePreloader event subscriber, that preloaded all routes that were identified as non-admin HTML and preloaded them on every HTML request format request.

Sites can have hundreds of these routes, and this preloading often resulted in significant additional memory usage. Due to render caching, most page requests only require a small subset of routes. That event subscriber has been removed.

For now, the \Drupal\Core\Routing\PreloadableRouteProviderInterface remains while possible alternative improvements to preloading are explored but it may be deprecated in the future.

*Source: [Route preloading/caching changes](https://www.drupal.org/node/3589089), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
