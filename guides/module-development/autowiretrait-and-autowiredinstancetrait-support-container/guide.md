---
name: autowiretrait-and-autowiredinstancetrait-support-container
title: "AutowireTrait and AutowiredInstanceTrait support container parameters"
description: "AutowireTrait and AutowiredInstanceTrait support container parameters"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3575335
change-record-nid: 3575335
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3558292](https://www.drupal.org/node/3558292)

Container parameters can be passed as autowired parameters to the constructors of classes using `AutowireTrait` and `AutowiredInstanceTrait`. These include classes implementing ContainerInjectionInterface, such as controllers and forms, and classes implementing ContainerFactoryPluginInterface, such as plugins. Previously, `AutowireTrait` and `AutowiredInstanceTrait` only supported autowiring services.

Controller example:

```php
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class SampleController extends ControllerBase {

  public function __construct(
    #[Autowire(param: 'container.namespaces')]
    protected readonly array $namespaces,
  ) {}

}
```

Alternative:

```php
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class SampleController extends ControllerBase {

  public function __construct(
    #[Autowire('%container.namespaces%')]
    protected readonly array $namespaces,
  ) {}

}
```

*Source: [AutowireTrait and AutowiredInstanceTrait support container parameters](https://www.drupal.org/node/3575335), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
