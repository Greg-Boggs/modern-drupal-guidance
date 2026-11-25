---
name: markfutureupdateequivalent-attribute-added-to-register
title: "MarkFutureUpdateEquivalent attribute added to register equivalent updates on site install"
description: "MarkFutureUpdateEquivalent attribute added to register equivalent updates on site install"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3572245
change-record-nid: 3572245
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3561302](https://www.drupal.org/node/3561302)

The attribute `Drupal\Core\Update\Attribute\MarkFutureUpdateEquivalent` has been added to make it possible to register `hook_update_N` implementations as equivalent during module install. Previously, registering updates as equivalent was only possible during module updates, because `hook_update_N` implementations do not run on module install.

Applying the `MarkFutureUpdateEquivalent` attribute to the `hook_update_N` function will the register equivalent updates during *both* module install and update. The `hook_update_N` itself can be a no-op.

If your site uses `Drupal\Core\Update\UpdateHookRegistry::markFutureUpdateEquivalent()`, it should be changed to use the new `MarkFutureUpdateEquivalent` attribute. `Drupal\Core\Update\UpdateHookRegistry::markFutureUpdateEquivalent()` is now `@internal` and should not be used.

In addition, `Drupal\Core\Update\UpdateHookRegistry::markFutureUpdateEquivalent()` has been updated to accept two new optional arguments `$module` and `$ran_update_number`. The new arguments will be required in Drupal 13.0.

### Example

In this example, `example_update_2100` in example module version 2.1.0 is registered as the equivalent future update of `example_update_1100` in example module version 1.1.0.

**Before**

```php
function example_update_1100(): void {
  \Drupal::service('update.update_hook_registry')->markFutureUpdateEquivalent(2100, '2.1.0');
}
```

**After**

```php
use Drupal\Core\Update\Attribute\MarkFutureUpdateEquivalent;

#[MarkFutureUpdateEquivalent(2100, '2.1.0')]
function example_update_1100(): void {
  // No-op.
}
```

### Reference

[Equivalent updates](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Extension%21module.api.php/function/hook_update_N/main)

*Source: [MarkFutureUpdateEquivalent attribute added to register equivalent updates on site install](https://www.drupal.org/node/3572245), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
