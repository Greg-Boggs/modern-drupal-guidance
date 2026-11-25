---
name: pluginbase-provides-create-factory-method-with-autowired
title: "PluginBase provides create() factory method with autowired parameters"
description: "PluginBase provides create() factory method with autowired parameters"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3542837
change-record-nid: 3542837
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3452852](https://www.drupal.org/node/3452852)

Classes that implement `\Drupal\Core\DependencyInjection\ContainerInjectionInterface` must provide a `create()` factory method to instantiate the object.

Now that [services can be autowired](https://www.drupal.org/node/3218156), the `PluginBase` class has been extended with a generic version of the `create()` method suitable for most plugins with dependency injection.

Previously, a constructor and `create()` method would be something like this:

```php
  public function __construct(
    array $configuration, $plugin_id,
    $plugin_definition,
    EntityTypeManagerInterface $entity_type_manager,
    BlockManagerInterface $block_manager
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->entityTypeManager = $entity_type_manager;
    $this->blockManager = $block_manager;
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('entity_type.manager'),
      $container->get('plugin.manager.block')
    );
  }
```

Now it is possible to drop the create() method:

```php
  public function __construct(
    array $configuration, $plugin_id,
    $plugin_definition,
    #[Autowire(service: 'entity_type.manager')]
    EntityTypeManagerInterface $entity_type_manager,
    BlockManagerInterface $block_manager
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->entityTypeManager = $entity_type_manager;
    $this->blockManager = $block_manager;
  }
```

Make sure the plugin implements `Drupal\Core\Plugin\ContainerFactoryPluginInterface` to proceed with autowiring.

In simple cases, the service can be inferred from the interface name alone. If a service cannot be determined from the interface directly, an exception will be raised, and you can add the #\[Autowire\] attribute to specify the service ID.

*Source: [PluginBase provides create() factory method with autowired parameters](https://www.drupal.org/node/3542837), a Drupal core change record by [danielveza](https://www.drupal.org/user/3362504) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
