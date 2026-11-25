---
name: oliveros-table-css-moved-to-a-standalone-library-and
title: "Olivero's table.css moved to a standalone library and attached only to tables."
description: "Olivero's table.css moved to a standalone library and attached only to tables."
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3517675
change-record-nid: 3517675
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3515093](https://www.drupal.org/node/3515093)

The `table.css` file from the Olivero theme has moved from the base global-styling library to a new standalone library `olivero.table`.

This library is now specifically attached in the following contexts:

- The `table.html.twig` template
- Views rendered with the `views-view-table` template
- Fields of the types: text_with_summary, text, and text_long to support tables added through CKEditor.

Example:\
**Before**

```php
/**
 * Implements hook_preprocess_HOOK().
 */
function olivero_preprocess_field(&$variables): void {
  $rich_field_types = ['text_with_summary', 'text', 'text_long'];

  if (in_array($variables['field_type'], $rich_field_types, TRUE)) {
    $variables['attributes']['class'][] = 'text-content';
  }

  if ($variables['field_type'] == 'image' && $variables['element']['#view_mode'] == 'full' && !$variables["element"]["#is_multiple"] && $variables['field_name'] !== 'user_picture') {
    $variables['attributes']['class'][] = 'wide-content';
  }
}
```

```php
/**
 * Implements hook_preprocess_table().
 */
function olivero_preprocess_table(&$variables): void {
  // Mark the whole table and the first cells if rows are draggable.
  if (!empty($variables['rows'])) {
    $draggable_row_found = FALSE;
    foreach ($variables['rows'] as &$row) {
      /** @var \Drupal\Core\Template\Attribute $row['attributes'] */
      if (!empty($row['attributes']) && $row['attributes']->hasClass('draggable')) {
        if (!$draggable_row_found) {
          $variables['attributes']['class'][] = 'draggable-table';
          $draggable_row_found = TRUE;
        }
      }
    }
  }
}
```

**After**

```php
/**
 * Implements hook_preprocess_HOOK().
 */
function olivero_preprocess_field(&$variables): void {
  $rich_field_types = ['text_with_summary', 'text', 'text_long'];

  if (in_array($variables['field_type'], $rich_field_types, TRUE)) {
    $variables['attributes']['class'][] = 'text-content';
    $variables['#attached']['library'][] = 'olivero/olivero.table';
  }

  if ($variables['field_type'] == 'image' && $variables['element']['#view_mode'] == 'full' && !$variables["element"]["#is_multiple"] && $variables['field_name'] !== 'user_picture') {
    $variables['attributes']['class'][] = 'wide-content';
  }
}
```

```php
/**
 * Implements hook_preprocess_table().
 */
function olivero_preprocess_table(&$variables): void {
  // Mark the whole table and the first cells if rows are draggable.
  if (!empty($variables['rows'])) {
    $draggable_row_found = FALSE;
    foreach ($variables['rows'] as &$row) {
      /** @var \Drupal\Core\Template\Attribute $row['attributes'] */
      if (!empty($row['attributes']) && $row['attributes']->hasClass('draggable')) {
        if (!$draggable_row_found) {
          $variables['attributes']['class'][] = 'draggable-table';
          $draggable_row_found = TRUE;
        }
      }
    }
  }

  $variables['#attached']['library'][] = 'olivero/olivero.table';
}
```

```php
/**
 * Implements hook_preprocess_HOOK() for views-view-table templates.
 */
function olivero_preprocess_views_view_table(&$variables): void {
  $variables['#attached']['library'][] = 'olivero/olivero.table';
}
```

This change reduces unnecessary CSS on pages that do not contain HTML tables.

*Source: [Olivero's table.css moved to a standalone library and attached only to tables.](https://www.drupal.org/node/3517675), a Drupal core change record by [sandip](https://www.drupal.org/user/3831162) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
