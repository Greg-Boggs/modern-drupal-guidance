---
name: calling-drupal-core-menu-menuactivetrail-construct-without
title: "Calling \\Drupal\\Core\\Menu\\MenuActiveTrail::__construct() without the $pathMatcher argument is deprecated"
description: "Calling \\Drupal\\Core\\Menu\\MenuActiveTrail::__construct() without the $pathMatcher argument is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3523495
change-record-nid: 3523495
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#1578832](https://www.drupal.org/node/1578832)

Calling `\Drupal\Core\Menu\MenuActiveTrail::__construct()` without the `$pathMatcher` argument is deprecated in drupal:11.2.0 and it will be required in drupal:12.0.0.

Before:

```php
use Drupal\Core\Menu\MenuActiveTrail;

$container = \Drupal::getContainer();
$menu_active_trail = new MenuActiveTrail(
  $container->get('plugin.manager.menu.link'),
  $container->get('current_route_match'),
  $container->get('cache.menu'),
  $container->get('lock'),
);
```

After:

```php
use Drupal\Core\Menu\MenuActiveTrail;

$container = \Drupal::getContainer();
$menu_active_trail = new MenuActiveTrail(
  $container->get('plugin.manager.menu.link'),
  $container->get('current_route_match'),
  $container->get('cache.menu'),
  $container->get('lock'),
  $container->get('path.matcher'),
);
```

*Source: [Calling \Drupal\Core\Menu\MenuActiveTrail::\__construct() without the $pathMatcher argument is deprecated](https://www.drupal.org/node/3523495), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
