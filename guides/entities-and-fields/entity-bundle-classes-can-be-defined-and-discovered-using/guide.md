---
name: entity-bundle-classes-can-be-defined-and-discovered-using
title: "Entity bundle classes can be defined and discovered using the Drupal\\Core\\Entity\\Attribute\\Bundle attribute"
description: "Entity bundle classes can be defined and discovered using the Drupal\\Core\\Entity\\Attribute\\Bundle attribute"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3574891
change-record-nid: 3574891
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3301682](https://www.drupal.org/node/3301682)

The `Drupal\Core\Entity\Attribute\Bundle` attribute can be added to `EntityInterface` classes to designate the class as a [bundle class](https://www.drupal.org/node/3191609). In order for the bundle class to be automatically discovered, it must be in the `\Entity` namespace of a module and have the Bundle attribute.

The use of the attribute can be supplemental to, or in lieu of, defining bundle classes in `entity_type_info` or `entity_type_info_alter` hook implementations. The bundle class definitions discovered through attributes are added after `entity_type_info` implementations run and before `entity_type_info_alter` implementations. In the case attribute-defined bundle classes defined in multiple modules all target the same entity bundle, `entity_type_info_alter` implementations can be used to specify a different bundle class other than the one attribute discovery provides.

**Usage**\
`hook_entity_type_info()`

```php
  #[Hook('entity_bundle_info')]
  public function entityBundleInfo(): array {
    $bundles['some_entity']['bundle_class_a']['class'] = EntityTestBundleClassA::class;
    $bundles['some_entity']['bundle_class_a']['label'] = 'Bundle class A';
    $bundles['some_entity']['bundle_class_a']['translatable'] = TRUE;

    return $bundles;
  }
```

**Attribute**\
Example of an using attribute override existing bundle class from `hook_entity_bundle_info` above:

```php
#[Bundle(
  entityType: 'some_entity',
  bundle: 'bundle_class_a',
  label: new TranslatableMarkup('Bundle class A label set by attribute'),
  translatable: FALSE,
)]
class BundleClassOverrideA extends SomeEntity {}
```

The `label` and `translatable` properties are optional and will override the existing values only if the bundle properties have non-NULL values.

**Example of creating a bundle class for entity types without a bundle entity type:**

```php
#[Bundle(
  entityType: 'some_entity',
  bundle: 'new_bundle',
  label: new TranslatableMarkup('New bundle'),
)]
class NewBundle extends SomeEntity {}
```

If creating a new bundle, setting the label explicitly is recommended, otherwise the bundle name will be used as the label.

Note that it is not possible to create a bundle class for a bundle (`new_bundle` in this example) for any entity type with a bundle entity type (such as node with node_type config entities). Bundle class definition for non-existing bundles will not be exposed as a new bundle. This is done to ensure that code that expects to be able to load the corresponding config entity for such a bundle to work consistently.

Such definitions are ignored instead of triggering an error to handle edge cases when adding or deleting those config entities.

*Source: [Entity bundle classes can be defined and discovered using the Drupal\Core\Entity\Attribute\Bundle attribute](https://www.drupal.org/node/3574891), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
