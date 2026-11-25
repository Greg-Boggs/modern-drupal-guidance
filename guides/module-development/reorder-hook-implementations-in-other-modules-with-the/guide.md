---
name: reorder-hook-implementations-in-other-modules-with-the
title: "Reorder hook implementations in other modules with the #[ReorderHook] attribute"
description: "Reorder hook implementations in other modules with the #[ReorderHook] attribute"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3497308
change-record-nid: 3497308
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3485896](https://www.drupal.org/node/3485896)

In the rare case when a module wants to change when the implementation of a hook by another module executes, the `#[ReorderHook]` attribute can be used. This attribute accepts the following required parameters:

- hook
- class
- method
- order

See [Hook implementations can now be ordered with an order parameter](https://www.drupal.org/node/3493962) for the possible value of `order`

You may place the `#[ReorderHook]` attribute on any class or method in the Hook namespace. However we recommend you put it on the implementation that requires you to reorder the other implementation.

#### Example

From the Workspaces module hook implemention, `workspaces_module_implementation_alter`, move the implementation of the Content Moderation's `entity_presave` hook to before the Workspaces module implementation.

**Before**

```php
function workspaces_module_implements_alter(&$implementations, $hook): void {
  if ($hook === 'entity_presave') {
    // Move Content Moderation's implementation before Workspaces, so we can
    // alter the publishing status for the default revision.
    if (isset($implementations['content_moderation'])) {
      $implementation = $implementations['content_moderation'];
      $implementations = ['content_moderation' => $implementation] + $implementations;
    }
  }
}
```

**After**

```php
use \Drupal\Core\Hook\Attribute\ReorderHook;
#[ReorderHook('entity_presave',
  class: ContentModerationHooks::class,
  method: 'entityPresave',
  order: new OrderBefore(['workspaces'])
)]
```

For converting other functionality of `hook_module_implements_alter` see [hook_module_implements_alter requires the #\[LegacyHook\] attribute and ordering must be done using new functionality](https://www.drupal.org/node/3496788).

*Source: [Reorder hook implementations in other modules with the #\[ReorderHook\] attribute](https://www.drupal.org/node/3497308), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
