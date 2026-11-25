---
name: cachepluginbase-cacheexpire-in-views-module-is-deprecated
title: "CachePluginBase::cacheExpire in views module is deprecated"
description: "CachePluginBase::cacheExpire in views module is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3576855
change-record-nid: 3576855
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3576556](https://www.drupal.org/node/3576556)

This method was used in \Drupal\views\Plugin\views\cache\CachePluginBase::cacheGet() to ensure that existing caches were not expired.

The cache expiration is also set in \Drupal\views\Plugin\views\cache\CachePluginBase::cacheSet() based on \Drupal\views\Plugin\views\cache\CachePluginBase::cacheSetMaxAge(), the cache system will not return expired results.

It is safe to remove calls to cacheExpire() and remove checking this in any core version, the logic in cacheGet() was unnecessary at least since Drupal 8.0.

*Source: [CachePluginBase::cacheExpire in views module is deprecated](https://www.drupal.org/node/3576855), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
