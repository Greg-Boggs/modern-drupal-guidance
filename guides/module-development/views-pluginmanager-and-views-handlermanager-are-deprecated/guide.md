---
name: views-pluginmanager-and-views-handlermanager-are-deprecated
title: "Views::pluginManager() and Views::handlerManager() are deprecated"
description: "Views::pluginManager() and Views::handlerManager() are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3566982
change-record-nid: 3566982
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3566424](https://www.drupal.org/node/3566424)

The static methods `Views::pluginManager()` and `Views::handlerManager()` have been deprecated in favor of accessing Views plugin managers via dependency injection or using a new service locator.

Code that accessed Views plugin managers through static wrapper methods:

```php
use Drupal\views\Views;

// Get a plugin manager for a specific type.
$filter_manager = Views::pluginManager('filter');
$field_manager = Views::handlerManager('field');

// Use with dynamic types.
$type = 'display';
$manager = Views::pluginManager($type);
```

should now use the service directly, or the service locator for dynamic types:

```php
// For known/static types, use the specific service directly.
$filter_manager = \Drupal::service('plugin.manager.views.filter');
$field_manager = \Drupal::service('plugin.manager.views.field');

// For dynamic types, use the service locator.
$type = 'display';
$manager = \Drupal::service('views.plugin_managers')->get($type);
```

Similarly the service locator can be injected:

```php
use Psr\Container\ContainerInterface;

class MyService {
  public function __construct(
    #[Autowire(service: 'views.plugin_managers')]
    private readonly ContainerInterface $viewsPluginManagers,
  ) {}

  public function doSomething(string $type): void {
    $manager = $this->viewsPluginManagers->get($type);
    // ...
  }
}
```

*Source: [Views::pluginManager() and Views::handlerManager() are deprecated](https://www.drupal.org/node/3566982), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
