---
name: new-method-getsummary-added-to-drupal-core-field
title: "New method getSummary() added to Drupal\\Core\\Field\\FieldTypeCategoryInterface"
description: "New method getSummary() added to Drupal\\Core\\Field\\FieldTypeCategoryInterface"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3526434
change-record-nid: 3526434
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3370326](https://www.drupal.org/node/3370326)

The `getSummary()` method has been added to `Drupal\Core\Field\FieldTypeCategoryInterface`, and it is implemented in `Drupal\Core\Field\FieldTypeCategory`.

If a class implements `FieldTypeCategoryInterface` and does not extend `FieldTypeCategory`, then it will have to be updated to implement the new method.

When the site builder adds a new field from `/admin/structure/types/manage/page/fields` (for example) and chooses a field-type category, the text from `getSummary()` will be shown on the form. For example, the `options` module adds the summary text below the Label field in this screenshot:

![ Selection list" modal window, showing the new descriptive text](https://www.drupal.org/files/issues/2025-10-25/selection_update.jpg)

A module that adds a field-type category can provide summary text by adding the `summary` key to the YAML file. For example, the summary text in the screenshot comes from `core/modules/options/options.field_type_categories.yml`:

```php
selection_list:
  label: 'Selection list'
  description: 'Create text or number based list with predefined options'
  summary: 'Each list item has a Name, with limited formatting, and a Value. Values that are in use cannot be changed, since they are stored in the database. The Names can be edited later.</p><p>The field type examples use the format Name (Value): Name is displayed to the user, and Value is stored in the database.'
  weight: -15
  libraries:
    - options/drupal.options-icon
```

It is safe to add the `summary` key to `mymodule.field_type_categories.yml`: if `mymodule` is used with earlier versions of Drupal core, then the summary will be ignored.

Like the values of the existing `label` and `description` keys, the new value is translatable.

*Source: [New method getSummary() added to Drupal\Core\Field\FieldTypeCategoryInterface](https://www.drupal.org/node/3526434), a Drupal core change record by [benjifisher](https://www.drupal.org/user/683300) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
