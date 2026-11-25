---
name: improve-performance-by-preventing-unnecessary-scanning-of
title: "Improve performance by preventing unnecessary scanning of procedural hooks"
description: "Improve performance by preventing unnecessary scanning of procedural hooks"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3490771
change-record-nid: 3490771
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3490355](https://www.drupal.org/node/3490355), [#3495943](https://www.drupal.org/node/3495943), [#3540033](https://www.drupal.org/node/3540033)

Note: This parameter has been renamed in 11.2 ([https://www.drupal.org/node/3498595](https://www.drupal.org/node/3498595)) to handle BC with newly supported preprocess hooks.

- hook_hook_info
- hook_module_implements_alter
- hook_requirements

Important note: hook_preprocess_HOOK has been converted in Drupal 11.2: [https://www.drupal.org/project/drupal/issues/3495943](https://www.drupal.org/project/drupal/issues/3495943). And so has hook_module_implements_alter: [https://www.drupal.org/node/3493962](https://www.drupal.org/node/3493962). For hook_hook_info(), see [https://www.drupal.org/node/3489765](https://www.drupal.org/node/3489765).

Drupal 11.1 [enables the use of OOP hooks](https://www.drupal.org/node/3442349), which are the future of hooks in Drupal. A backwards-compatibility layer is provided for legacy procedural hooks. This backwards compatibility layer scans all module code to check for hooks, which has a performance cost. Modules can reduce or eliminate this scanning.

If your module does not implement any procedural hooks, add a container parameter to your `module_name.services.yml`:

Drupal 11.2+:

```php
parameters:
  module_name.skip_procedural_hook_scan: true
```

(In Drupal 11.1, it was hook_converted. It is not necessary to use this anymore, this will only lead to a minimal optimization loss on 11.1)

Note that you can set this parameter even if you are providing `#[LegacyHook]` fallbacks; this parameter only affects scanning in Drupal 11.1+. So if you have converted all of your procedural hooks to OOP hooks, but you still provide procedural hooks marked with the `#[LegacyHook]` attribute, then there will be no scanning on Drupal 11.1, which improves performance, while earlier versions of Drupal will be able to use the legacy procedural hooks.

**Warning:** Modules with a hook_hook_info() must not use this parameter as it prevents it from being discovered.

There are a number of so-called hook implementations which are either called by the install system or the theme system, or in the case of functions marked with #\[LegacyHook\] are not invoked at all. These can be placed after `#[StopProceduralHookScan] ` and can be used even if `hooks_converted` in module services was utilized:

- hook_install
- hook_uninstall
- hook_update_last_removed
- hook_hook_install_tasks
- hook_hook_install_tasks_alter
- hook_post_updates
- hook_update_N
- hook_preprocess_HOOK (Drupal 11.1 only)

If a module still has some regular hooks, it is alternatively possible to improve performance by marking the first function that is not a hook in .module or .inc file with the new `#[ProceduralHookScanStop]` (Renamed in Drupal 11.2, StopProceduralHookScan in Drupal 11.1). Since all regular hooks have OOP alternatives in 11.2, it is generally not recommend or necessary to use this. Only consider it if a module has a large number of functions in .module and .inc files

It is possible to move hook implementations to the top of your .module file and utilize this attribute on the first function after the implementation. Hooks might remain because the conversion was only partial or because the following three hooks must be procedural (for now):

*Source: [Improve performance by preventing unnecessary scanning of procedural hooks](https://www.drupal.org/node/3490771), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
