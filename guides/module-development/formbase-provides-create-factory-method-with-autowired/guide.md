---
name: formbase-provides-create-factory-method-with-autowired
title: "FormBase provides create() factory method with autowired parameters"
description: "FormBase provides create() factory method with autowired parameters"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3575184
change-record-nid: 3575184
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3398534](https://www.drupal.org/node/3398534)

Classes that implement `\Drupal\Core\DependencyInjection\ContainerInjectionInterface` must provide a `create()` factory method to instantiate the object.

Now that [services can be autowired](https://www.drupal.org/node/3218156) and [plugins can be autowired](https://www.drupal.org/node/3542837), the `FormBase` class has also been extended with AutowireTrait, providing a generic version of the `create()` method suitable for most forms that need dependency injection.

Previously, a constructor and `create()` method would be something like this:

```php
  public function __construct(EntityDisplayRepositoryInterface $entity_display_repository, ConfigFactoryInterface $config_factory) {
    $this->entityDisplayRepository = $entity_display_repository;
    $this->configFactory = $config_factory;
  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_display.repository'),
      $container->get('config.factory')
    );
  }
```

Now it is possible to drop the create() method:

```php
  public function __construct(EntityDisplayRepositoryInterface $entity_display_repository, ConfigFactoryInterface $config_factory) {
    $this->entityDisplayRepository = $entity_display_repository;
    $this->configFactory = $config_factory;
  }
```

In simple cases, the service can be inferred from the interface name alone. If a service cannot be determined from the interface directly, an exception will be raised, and you can add the #\[Autowire\] attribute to specify the service ID.

*Source: [FormBase provides create() factory method with autowired parameters](https://www.drupal.org/node/3575184), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
