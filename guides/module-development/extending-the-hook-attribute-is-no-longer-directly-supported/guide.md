---
name: extending-the-hook-attribute-is-no-longer-directly-supported
title: "Extending the Hook attribute is no longer directly supported"
description: "Extending the Hook attribute is no longer directly supported"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3524585
change-record-nid: 3524585
introduced-in-version: "11.2.0-beta1"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0-beta1\
Issue links: [#3523109](https://www.drupal.org/node/3523109)

## The following hooks still support OOP implementations

- `hook_form_alter`
- `hook_form_BASE_FORM_ID_alter`
- `hook_form_FORM_ID_alter`
- `hook_preprocess`
- `hook_preprocess_HOOK`

### The `#[FormAlter]` attribute has been removed

The `#[FormAlter]` attribute was added in 11.2.0-alpha1 and removed for 11.2.0-beta1 and beyond.

- `hook_form_alter` can still be OOP, use `#[Hook('form_alter')]` instead.
- `hook_form_BASE_FORM_ID_alter` can still be OOP, use `#[Hook('form_BASE_FORM_ID_alter')]` instead.
- `hook_form_FORM_ID_alter` can still be OOP, use `#[Hook('form_FORM_ID_alter')]` instead.

### The `#[Preprocess]` attribute has been removed

The `#[Preprocess]` attribute was added in 11.2.0-alpha1 and removed for 11.2.0-beta1 and beyond.

- `hook_preprocess` can still be OOP, use `#[Hook('preprocess')]` instead.
- `hook_preprocess_HOOK` can still be OOP, use `#[Hook('preprocess_HOOK')]` instead.

## Changes to the `#[Hook]` attribute

The `PREFIX` and `SUFFIX` constants have been removed from the `#[Hook]` attribute, there is no replacement. The `$hook` parameter is required.

*Source: [Extending the Hook attribute is no longer directly supported](https://www.drupal.org/node/3524585), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
