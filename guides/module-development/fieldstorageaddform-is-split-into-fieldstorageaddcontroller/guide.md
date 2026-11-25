---
name: fieldstorageaddform-is-split-into-fieldstorageaddcontroller
title: "FieldStorageAddForm is split into FieldStorageAddController and FieldStorageAddForm"
description: "FieldStorageAddForm is split into FieldStorageAddController and FieldStorageAddForm"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3503549
change-record-nid: 3503549
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3386762](https://www.drupal.org/node/3386762)

**Important:**\
Ensure your code is using `hook_field_info_entity_type_ui_definitions_alter` when possible. Refer to this [change record](https://www.drupal.org/node/3408700) for an example.

For code directly altering the field storage form:\
`\Drupal\field_ui\Form\FieldStorageAddForm` is now split into `\Drupal\field_ui\Form\FieldStorageAddForm` and a new controller `\Drupal\field_ui\Form\FieldStorageAddController`. Field creation/editing process open in modals (field selection form, combined field settings form).\
This means that form alter implementations may need to be updated.\
**Before**

```php
  #[Hook('form_field_ui_field_storage_add_form_alter')]
  public function formFieldUiFieldStorageAddFormAlter(&$form, FormStateInterface $form_state, $form_id) : void {
    $storage_type = $form_state->getValue('new_storage_type');
    if ($storage_type === 'field_my_type')) {
      $form['group_field_options_wrapper']['description_wrapper'] = ['#type' => 'item', '#markup' => t('My description')];
    }
  }
```

**After**

```php
  #[Hook('form_field_ui_field_storage_add_form_alter')]
  public function formFieldUiFieldStorageAddFormAlter(&$form, FormStateInterface $form_state, $form_id) : void {
    $storage_type = $form_state->getStorage()['field_type'];
    if ($storage_type === 'field_my_type') {
      $form['field_options_wrapper']['description_wrapper'] = ['#type' => 'item', '#markup' => t('My description')];
    }
  }
```

*Source: [FieldStorageAddForm is split into FieldStorageAddController and FieldStorageAddForm](https://www.drupal.org/node/3503549), a Drupal core change record by [narendrar](https://www.drupal.org/user/1730192) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
