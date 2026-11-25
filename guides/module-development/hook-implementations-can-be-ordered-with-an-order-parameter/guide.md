---
name: hook-implementations-can-be-ordered-with-an-order-parameter
title: "Hook implementations can be ordered with an order parameter"
description: "Hook implementations can be ordered with an order parameter"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3493962
change-record-nid: 3493962
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3485896](https://www.drupal.org/node/3485896)

The `#[Hook]` attribute has an order argument to allow hook implementations to be ordered.

The order parameter accepts the following simple ordering options.\
`\Drupal\Core\Hook\Order\Order::First`\
`\Drupal\Core\Hook\Order\Order::Last`

The order parameter also accepts the following complex ordering options which also accept parameters.\
`\Drupal\Core\Hook\Order\OrderBefore`\
`\Drupal\Core\Hook\Order\OrderAfter`

`OrderBefore()` and `OrderAfter()` accept the following parameters:\
`modules:` an array of modules to order before or after.\
`classesAndMethods:` an array of arrays of classes and methods to order before or after.

See multiple ordering operations below for information on how multiple modules implementing Order::First is resolved.

## Examples

### Order the hook first

`#[Hook('some_hook', order: Order::First)]`

### Order the hook last

`#[Hook('some_hook', order: Order::Last)]`

### Order the hook before another module's implementation

`#[Hook('some_hook', order: new OrderBefore(['other_module']))]`

### Order the hook after another module's implementation

`#[Hook('some_hook', order: new OrderAfter(['other_module']))]`

### Order the hook before another module's implementation by specifying class and method

```php
#[Hook('some_hook', 
  order: new OrderBefore(
    classesAndMethods: [
      [Foo::class, 'someMethod'],
      [Bar::class, 'someOtherMethod'],
    ]
  )
)]
```

### Order the hook after another module's implementation by specifying class and method

```php
#[Hook('some_hook', 
  order: new OrderAfter(
    classesAndMethods: [
      [Foo::class, 'someMethod'],
      [Bar::class, 'someOtherMethod'],
    ]
  )
)]
```

## Multiple ordering operations

By default hooks are ordered in module order which is defined by module weight, then alphabetically.\
Ordering operations are applied by module order as well. [Reorder operations](https://www.drupal.org/node/3497308) happen after all Order operations have been applied and they occur in module order as well.\
Order operations are applied sequentially and apply to the current order. If multiple modules say they want their hook to run first, the one that is last in module order will be first.

For example if we have modules A, B, and C that implement some_hook.\
Default order:

- A::some_hook
- B::some_hook
- C::some_hook

If B and C both apply Order::First then the final order will be:

- C::some_hook
- B::some_hook
- A::some_hook

We start with A, then B, then C. When B's order operation is applied B says it wants to be first so we get B, A, C. Then C's order operation is applied and C says it wants to be first so we end up with C, B, A.

## hook_module_implements_alter

If you ordered your hooks using `hook_module_implements_alter` see [hook_module_implements_alter requires the #\[LegacyModuleImplementsAlter\] attribute and ordering must be done using new functionality](https://www.drupal.org/node/3496788) for more information.

*Source: [Hook implementations can be ordered with an order parameter](https://www.drupal.org/node/3493962), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
