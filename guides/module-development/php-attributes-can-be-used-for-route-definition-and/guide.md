---
name: php-attributes-can-be-used-for-route-definition-and
title: "PHP Attributes can be used for route definition and discovery"
description: "PHP Attributes can be used for route definition and discovery"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3324758
change-record-nid: 3324758
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3311365](https://www.drupal.org/node/3311365)

Starting with Drupal 11.4.0, you can now use attributes on your controllers to specify the routes the controller is used for. Any classes in a module's `Controller` namespace (for example, `Drupal\example\Controller`) that have the `Symfony\Component\Routing\Attribute\Route` attribute will be picked up as route definitions.

This supplements the existing `.routing.yml` based declarations.

The structure of the properties remains the same, but human-readable strings need to be explicitly translated with \Drupal\Core\StringTranslation\TranslatableMarkup as in the example below.

### Example using .yml file

```php
system.401:
  path: '/system/401'
  defaults:
    _controller: '\Drupal\system\Controller\Http4xxController:on401'
    _title: 'Unauthorized'
  requirements:
    _access: 'TRUE'
```

### Example using a route attribute

```php
namespace Drupal\system\Controller;

use Drupal\Core\StringTranslation\TranslatableMarkup;
use Symfony\Component\Routing\Attribute\Route;

class Http4xxController extends ControllerBase {

 /**
   * The default 401 content.
   *
   * @return array
   *   A render array containing the message to display for 401 pages.
   */
  #[Route(
    path: '/system/401',
    name: 'system.401',
    requirements: ['_access' => 'TRUE'],
    defaults: ['_title' => new TranslatableMarkup('Unauthorized')]
  )]
  public function on401() {
    return [
      '#markup' => $this->t('Log in to access this page.'),
    ];
  }

}
```

### Multiple routes in one class

The `#[Route]` attribute can also be applied at class level to provide defaults. The `name` attribute will be used to prefix all routes in the class. Other attributes will be merged together. The following is equivalent to the above example:

```php
namespace Drupal\system\Controller;

use Drupal\Core\StringTranslation\TranslatableMarkup;
use Symfony\Component\Routing\Attribute\Route;

#[Route(
  name: 'system.',
  requirements: ['_access' => 'TRUE'],
)]
class Http4xxController extends ControllerBase {

 /**
   * The default 401 content.
   *
   * @return array
   *   A render array containing the message to display for 401 pages.
   */
  #[Route(
    path: '/system/401',
    name: '401',
    defaults: ['_title' => new TranslatableMarkup('Unauthorized')]
  )]
  public function on401() {
    return [
      '#markup' => $this->t('Log in to access this page.'),
    ];
  }

}
```

#### Using class and method level attributes

Defaults can be set at class level, and extended or overridden at method level as follows:

The `name` and `path` properties are concatenated, so where needed a prefix can be specified at class level with individual suffixes at method level.

`defaults`, `requirements` and `options` keys are merged together, with method level taking precedence.

`schemes` and `methods` arrays are merged together.

`host` and `priority` values take precedence from method level, but defaults can be set at class level.

### Routes using \__invoke

The class-level route can also be used to define a route using the `__invoke` method:

```php
namespace Drupal\router_test\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Test controller.
 */
#[Route(
  '/test_class_attribute',
  'test_class_attribute',
  requirements: ['_access' => 'TRUE']
)]
class TestClassAttribute extends ControllerBase {

  /**
   * Provides test content.
   */
  public function __invoke() {
    return ['#markup' => 'Testing __invoke() with a Route attribute on the class'];
  }

}
```

*Source: [PHP Attributes can be used for route definition and discovery](https://www.drupal.org/node/3324758), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
