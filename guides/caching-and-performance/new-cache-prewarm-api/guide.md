---
name: new-cache-prewarm-api
title: "New cache prewarm API"
description: "New cache prewarm API"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3386853
change-record-nid: 3386853
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3257725](https://www.drupal.org/node/3257725)

A new API has been added for services to tag themselves as prewarmable.

To do this, add the `cache_prewarmable` service tag, and implement `PreWarmableInterface`.

Example

```php
    tags:
      - { name: cache_prewarmable }
```

Plugin managers may also use `PreWarmablePluginManagerTrait` and several core plugin managers have been adapted to use it.

```php
+  /**
+   * Implements \Drupal\Core\PreWarm\PreWarmableInterface.
+   */
+  public function preWarm(): void {
+    $this->getDefinitions();
+  }
```

Cache prewarming should not depend on request-specific or request-derived information like the current route, language, or theme, although you could specify these explicitly in a preWarm method as long as persistent and any static caching is accounted for. This is because the context in which a cache can be prewarmed could be prior to routing or via the CLI.

*Source: [New cache prewarm API](https://www.drupal.org/node/3386853), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
