---
name: entity-type-bundle-info-parameter-added-to
title: "$entity_type_bundle_info parameter added to EntityContentBase::__construct()"
description: "$entity_type_bundle_info parameter added to EntityContentBase::__construct()"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3476634
change-record-nid: 3476634
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2630732](https://www.drupal.org/node/2630732)

The migrate destination plugin base class \Drupal\migrate\Plugin\migrate\destination\EntityContentBase has a new parameter added to its constructor: `EntityTypeBundleInfoInterface $entity_type_bundle_info.`

This class provides a useful base for plugins that work with content entities, and so many plugins will inherit from it. If these plugins inject services, they will have their own \__construct() and create() methods. These methods will need to be changed to account for the new parameter in the parent class.

In Drupal 11.1 or later, the constructor of the base class will generate a deprecation notice if the new parameter is not provided. In Drupal 12.0 or later, the constructor will generate an error.

Before:

```php
MyMigrateDestinationPlugin extends EntityContentBase {

  public function __construct(array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration, EntityStorageInterface $storage, array $bundles, EntityFieldManagerInterface $entity_field_manager, FieldTypePluginManagerInterface $field_type_manager, MyService $my_service, ?AccountSwitcherInterface $account_switcher = NULL) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $migration, $storage, $bundles, $entity_field_manager, $field_type_manager, $account_switcher);
    $this->my_service = $my_service;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition, ?MigrationInterface $migration = NULL) {
    $entity_type = static::getEntityTypeId($plugin_id);
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $migration,
      $container->get('entity_type.manager')->getStorage($entity_type),
      array_keys($container->get('entity_type.bundle.info')->getBundleInfo($entity_type)),
      $container->get('entity_field.manager'),
      $container->get('plugin.manager.field.field_type'),
      $container->get('my_service'),
      $container->get('account_switcher'),
    );
  }
```

After:

```php
MyMigrateDestinationPlugin extends EntityContentBase {

  public function __construct(array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration, EntityStorageInterface $storage, array $bundles, EntityFieldManagerInterface $entity_field_manager, FieldTypePluginManagerInterface $field_type_manager, MyService $my_service, ?AccountSwitcherInterface $account_switcher = NULL, ?EntityTypeBundleInfoInterface $entity_type_bundle_info = NULL) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $migration, $storage, $bundles, $entity_field_manager, $field_type_manager, $account_switcher, $entity_type_bundle_info);
    $this->my_service = $my_service;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition, ?MigrationInterface $migration = NULL) {
    $entity_type = static::getEntityTypeId($plugin_id);
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $migration,
      $container->get('entity_type.manager')->getStorage($entity_type),
      array_keys($container->get('entity_type.bundle.info')->getBundleInfo($entity_type)),
      $container->get('entity_field.manager'),
      $container->get('plugin.manager.field.field_type'),
      $container->get('my_service'),
      $container->get('account_switcher'),
      $container->get('entity_type.bundle.info'),
    );
  }
```

*Source: [$entity_type_bundle_info parameter added to EntityContentBase::\__construct()](https://www.drupal.org/node/3476634), a Drupal core change record by [joachim](https://www.drupal.org/user/107701) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
