---
name: hook-implementations-can-now-be-removed-with-a-removehook
title: "Hook implementations can now be removed with a #[RemoveHook] attribute."
description: "Hook implementations can now be removed with a #[RemoveHook] attribute."
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3496786
change-record-nid: 3496786
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3485896](https://www.drupal.org/node/3485896)

The new `#[RemoveHook]` attribute can be used when you want to remove the implementation of a hook in another module. It accepts the following required parameters:

- hook
- class
- method

You may place the `#[RemoveHook]` attribute on any class or method in the Hook namespace, however for organizational purposes it is recommended you put it on the method that requires you to remove the other implementation.

Example conversion for `navigation_module_implementation_alter`

**Before**

```php
function navigation_module_implements_alter(&$implementations, $hook): void {
  if ($hook == 'help') {
    // We take over the layout_builder hook_help().
    unset($implementations['layout_builder']);
  }
}
```

**After**

```php
use \Drupal\Core\Hook\Attribute\RemoveHook;
#[RemoveHook('help', class: LayoutBuilderHooks::class, method: 'help')]
```

For converting other functionality of `hook_module_implements_alter` see [hook_module_implements_alter requires the #\[LegacyModuleImplementsAlter\] attribute](https://www.drupal.org/node/3496788).

*Source: [Hook implementations can now be removed with a #\[RemoveHook\] attribute.](https://www.drupal.org/node/3496786), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
