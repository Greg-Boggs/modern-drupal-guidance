---
name: hook-module-implements-alter-requires-the
title: "hook_module_implements_alter requires the #[LegacyModuleImplementsAlter] attribute"
description: "hook_module_implements_alter requires the #[LegacyModuleImplementsAlter] attribute"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3496788
change-record-nid: 3496788
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3485896](https://www.drupal.org/node/3485896)

The functionality of `hook_module_implements_alter` is replaced with two new attributes and an `order` parameter on the `#[Hook]` attribute. Ordering *must* be done using new functionality.

#### Update existing `hook_module_implements_alter` code

This is not a typical deprecation and requires care for your module to support versions of Drupal older than 11.2

Follow these steps to update your module in a backwards compatible way;

1. Achieve the same functionality as your `hook_module_implements_alter`. Dynamic ordering is currently not supported.
2. Add the `#[LegacyModuleImplementsAlter]` to your implementation of `hook_module_implements_alter`. Once the minimum supported version of Drupal for the module is 11.2 or larger you may delete the entire function and attribute.

These change records provide examples for updating `hook_module_implements_alter` implementations.

- [Order hook implementations with the order parameter.](https://www.drupal.org/node/3493962)
- [Reorder hook implementations in other modules with the #\[ReOrderHook\] attribute.](https://www.drupal.org/node/3497308)
- [Remove hook implementations the #\[RemoveHook\] attribute.](https://www.drupal.org/node/3496786)

### Examples of common patterns

Note: more complex patterns can occur in `hook_module_implements_alter`, but the three examples below cover most implementations.

**Before: Ordering first**

```php
if ($hook === 'entity_bundle_info_alter') {
      $group = $implementations['content_translation'];
      $implementations = ['content_translation' => $group] + $implementations;
}
```

**After:**\
`#[Hook('entity_bundle_info_alter', order: Order::First)]`

**Before: Ordering last**

```php
if ($hook === 'entity_view_alter') {
    $group = $implementations['layout_builder'];
    unset($implementations['layout_builder']);
    $implementations['layout_builder'] = $group;
  }
```

**After:**\
`#[Hook('entity_view_alter', order: Order::Last)]`

**Before: Ordering before another implementation**

```php
if ($hook === 'system_breadcrumb_alter') {
    $group = $implementations['layout_builder_test'];
    $implementations = [
      'layout_builder_test' => $group,
    ] + $implementations;
  }
```

**After:**

```php
#[Hook(
    'system_breadcrumb_alter',
    order: new OrderBefore(
      modules: ['layout_builder']
    )
  )]
```

*Source: [hook_module_implements_alter requires the #\[LegacyModuleImplementsAlter\] attribute](https://www.drupal.org/node/3496788), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
