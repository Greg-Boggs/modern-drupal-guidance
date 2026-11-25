---
name: calling-drupal-core-render-renderer-addcacheabledependency
title: "Calling \\Drupal\\Core\\Render\\Renderer::addCacheableDependency with an object that doesn't implement CacheableDependencyInterface is deprecated"
description: "Calling \\Drupal\\Core\\Render\\Renderer::addCacheableDependency with an object that doesn't implement CacheableDependencyInterface is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3525389
change-record-nid: 3525389
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3525388](https://www.drupal.org/node/3525388)

#### Before

Calling `\Drupal\Core\Render\Renderer::addCacheableDependency` with a `$dependency` parameter that did not implement `\Drupal\Core\Cache\CacheableDependencyInterface` would result in the page being uncacheable (max-age 0).

This is rarely what the developer intended. There are other ways to mark a page as uncacheable (e.g setting max-age to 0 explicitly)

#### After

In 13.0.0, the method `\Drupal\Core\Render\Renderer::addCacheableDependency` will be have a type hint for the `$dependency` argument of `\Drupal\Core\Cache\CacheableDependencyInterface`.

```php
public function addCacheableDependency(array &$elements, CacheableDependencyInterface $dependency) {
```

*Source: [Calling \Drupal\Core\Render\Renderer::addCacheableDependency with an object that doesn't implement CacheableDependencyInterface is deprecated](https://www.drupal.org/node/3525389), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
