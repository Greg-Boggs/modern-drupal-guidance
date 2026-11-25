---
name: routesubscriberbase-can-define-routes-as-well-as-alter-them
title: "RouteSubscriberBase can define routes as well as alter them"
description: "RouteSubscriberBase can define routes as well as alter them"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3613489
change-record-nid: 3613489
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3593789](https://www.drupal.org/node/3593789)

`\Drupal\Core\Routing\RouteSubscriberBase` now subscribes to `RoutingEvents::STATIC` in addition to `RoutingEvents::ALTER`. Subclasses implement `buildRoutes()` to return new routes. This replaces `route_callbacks` entries in \*.routing.yml files.

`alterRoutes()` is no longer abstract. Subclasses that only define routes can omit it. Existing subscribers continue to work unchanged.

## Before

```php
# my_module.routing.yml
route_callbacks:
  - 'my_module.route_subscriber:routes'
```

```php
class RouteSubscriber extends RouteSubscriberBase {

  public function routes() {
    $collection = new RouteCollection();
    // Add routes.
    return $collection;
  }

  protected function alterRoutes(RouteCollection $collection) {
    // Alter routes.
  }

}
```

## After

```php
class RouteSubscriber extends RouteSubscriberBase {

  protected function buildRoutes(): RouteCollection {
    $collection = new RouteCollection();
    // Add routes.
    return $collection;
  }

  protected function alterRoutes(RouteCollection $collection) {
    // Alter routes (omit this method entirely if no altering is required).
  }

}
```

A subclass that overrides `getSubscribedEvents()` must keep the `RoutingEvents::STATIC` entry, or call `parent::getSubscribedEvents()`.

*Source: [RouteSubscriberBase can define routes as well as alter them](https://www.drupal.org/node/3613489), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
