---
name: linkwidget-validatetitleelement-is-deprecated
title: "LinkWidget::validateTitleElement() is deprecated"
description: "LinkWidget::validateTitleElement() is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3554139
change-record-nid: 3554139
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3093118](https://www.drupal.org/node/3093118)

`LinkWidget::validateTitleElement()` is deprecated. Validation was moved to the `LinkTitleRequiredConstraintValidator` on the `LinkItem` field plugin instead. If your custom widget is for `field_types: ['link']`, then you can remove `validateTitleElement()` from your element's form validation with no replacement.

Before:

```php
public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
  $element['#element_validate'][] = [static::class, 'validateTitleElement'];
  return $element;
}
```

After:

```php
public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
  // No replacement.
  return $element;
}
```

*Source: [LinkWidget::validateTitleElement() is deprecated](https://www.drupal.org/node/3554139), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
