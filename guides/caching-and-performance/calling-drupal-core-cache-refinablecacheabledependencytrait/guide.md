---
name: calling-drupal-core-cache-refinablecacheabledependencytrait
title: "Calling \\Drupal\\Core\\Cache\\RefinableCacheableDependencyTrait::addCacheableDependency with an object that doesn't implement CacheableDependencyInterface is no longer supported"
description: "Calling \\Drupal\\Core\\Cache\\RefinableCacheableDependencyTrait::addCacheableDependency with an object that doesn't implement CacheableDependencyInterface is no longer supported"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3232020
change-record-nid: 3232020
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3232018](https://www.drupal.org/node/3232018)

#### Before

Calling `\Drupal\Core\Cache\RefinableCacheableDependencyTrait::addCacheableDependency` with an object that did not implement `\Drupal\Core\Cache\CacheableDependencyInterface` would result in the page being uncacheable (max-age 0).

This is rarely what the developer intended. There are other ways to mark a page as uncacheable (e.g setting max-age to 0 explicitly)

#### After

In 12.0.0, the method `\Drupal\Core\Cache\RefinableCacheableDependencyTrait::addCacheableDependency` will be have a type hint of `\Drupal\Core\Cache\CacheableDependencyInterface` for the argument.\
` public function addCacheableDependency(CacheableDependencyInterface $other_object) {`

*Source: [Calling \Drupal\Core\Cache\RefinableCacheableDependencyTrait::addCacheableDependency with an object that doesn't implement CacheableDependencyInterface is no longer supported](https://www.drupal.org/node/3232020), a Drupal core change record by [larowlan](https://www.drupal.org/user/395439) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
