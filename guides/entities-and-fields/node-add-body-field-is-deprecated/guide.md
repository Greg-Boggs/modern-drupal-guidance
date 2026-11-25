---
name: node-add-body-field-is-deprecated
title: "node_add_body_field() is deprecated"
description: "node_add_body_field() is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3516778
change-record-nid: 3516778
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3489266](https://www.drupal.org/node/3489266)

The `node_add_body_field` method was only used in test code by Drupal core.

The function is now deprecated, there is no direct replacement.

If you need to create content types in tests with a body field, use `ContentTypeCreationTrait::createContentType` which will automatically add a body field.

If you need to add body fields for other entity types, there is also a new `BodyFieldCreationTrait` to add the same type of field to any bundle.

Otherwise you can create the field config directly:

```php
  $field_storage = FieldStorageConfig::loadByName('node', 'body');
  $field = FieldConfig::loadByName('node', $bundle, 'body');
  if (!$field) {
    $field = FieldConfig::create([
      'field_storage' => $field_storage,
      'bundle' => $bundle,
      'label' => $label,
      'settings' => [
        'display_summary' => TRUE,
        'allowed_formats' => [],
      ],
    ]);
    $field->save();
  }
```

*Source: [node_add_body_field() is deprecated](https://www.drupal.org/node/3516778), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
