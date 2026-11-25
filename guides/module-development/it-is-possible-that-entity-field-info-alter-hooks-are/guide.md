---
name: it-is-possible-that-entity-field-info-alter-hooks-are
title: "It is possible that entity field info alter hooks are invoked with incomplete set of fields"
description: "It is possible that entity field info alter hooks are invoked with incomplete set of fields"
drupal-core: ">=11.3.9"
source-url: https://www.drupal.org/node/3591180
change-record-nid: 3591180
introduced-in-version: "11.3.9"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.9\
Issue links: [#3045509](https://www.drupal.org/node/3045509)

It is now possible that when entity field info alter hooks `hook_entity_base_field_info_alter()` and `hook_entity_bundle_field_info_alter()` are invoked, the array of entity type or bundle field definitions passed to the hook methods is not complete. This can occur when field definitions are being created, such as during installation.

In hook implementations, it is advised to confirm that the field definition exists in the array of fields before trying to alter it.

**Before**

```php
  #[Hook('entity_bundle_field_info_alter')]
  public function entityBundleFieldInfoAlter(array &$fields, EntityTypeInterface $entity_type, string $bundle): void {
    if ($entity_type->id() === '{ENTITY TYPE ID}' && $bundle === '{BUNDLE ID}') {
      $fields['{FIELD NAME}']->addConstraint('UniqueField');
```

**After**

```php
  #[Hook('entity_bundle_field_info_alter')]
  public function entityBundleFieldInfoAlter(array &$fields, EntityTypeInterface $entity_type,string $bundle): void {
    if ($entity_type->id() === '{ENTITY TYPE ID}' && $bundle === '{BUNDLE ID}') {
      if (\array_key_exists('{FIELD NAME}', $fields)) {
        $fields['{FIELD NAME}']->addConstraint('UniqueField');
      }
    }
  }
```

*Source: [It is possible that entity field info alter hooks are invoked with incomplete set of fields](https://www.drupal.org/node/3591180), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
