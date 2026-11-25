---
name: autowiretrait-supports-setter-injection-with-the-required
title: "AutowireTrait supports setter injection with the #[Required] attribute"
description: "AutowireTrait supports setter injection with the #[Required] attribute"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3566688
change-record-nid: 3566688
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3558306](https://www.drupal.org/node/3558306)

Classes using `AutowireTrait` or `AutowiredInstanceTrait` can now inject dependencies via setter methods marked with Symfony's `#[Required]` attribute, eliminating the need to override constructors in subclasses. This includes controllers that extend `\Drupal\Core\Controller\ControllerBase` and plugins that extend `\Drupal\Core\Plugin\PluginBase`.

For example, if there is a base plugin class like this:

```php
abstract class ExamplePluginBase extends PluginBase {

  public function __construct(
    protected readonly Service1Interface $service1,
    protected readonly Service2Interface $service2,
    protected readonly Service3Interface $service3,
  ) {}
  ...
}
```

a plugin class extending ExamplePluginBase would previously need to inject additional services by appending parameters to the constructor:

```php
class ExamplePlugin1 extends ExamplePluginBase {

  public function __construct(
    Service1Interface $service1,
    Service2Interface $service2,
    Service3Interface $service3,
    protected readonly SubclassOnlyServiceInterface $subclassOnlyService,
  ) {
    parent::__construct($service1, $service2, $service3);
  }
  ...
}
```

Now the plugin can do this instead:

```php
use Symfony\Contracts\Service\Attribute\Required;

class ExamplePlugin1 extends ExamplePluginBase {

  protected SubclassOnlyServiceInterface $subclassOnlyService;

  #[Required]
  public function setSubclassOnlyService(SubclassOnlyServiceInterface $subclassOnlyService): void {
    $this->subclassOnlyService = $subclassOnlyService
  }
  ...
}
```

The trait will ensure that all `#[Required]` functions are called automatically when the controller or plugin is instantiated.

Services in the setter function are resolved by typehint or the `#[Autowire]` attribute, in the same way as the constructor.

*Source: [AutowireTrait supports setter injection with the #\[Required\] attribute](https://www.drupal.org/node/3566688), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
