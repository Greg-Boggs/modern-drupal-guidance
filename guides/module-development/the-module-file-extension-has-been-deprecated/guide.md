---
name: the-module-file-extension-has-been-deprecated
title: "The .module file extension has been deprecated"
description: "The .module file extension has been deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3619765
change-record-nid: 3619765
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3619733](https://www.drupal.org/node/3619733)

The `.module` file extension has been deprecated. Support for autoloading the `.module` files will be removed in Drupal 13.

All functions in `.module` files should be converted to the appropriate object-oriented replacement.\
See the rector script and change records below for assistance.

To simplify your conversion, set your module's minimum version requirement to Drupal 11.3.0. (If you still support earlier versions, the CR's give information about how to handle backwards compatibility.)

### Hooks and hook helper functions

All hook implementations should be moved to object-oriented classes with the appropriate attributes.\
[Most hooks can just use the #\[Hook\] attribute.](https://www.drupal.org/node/3442349)

The following hooks require special treatment:

- hook_requirements(\_alter)

  - [Install phase replacement](https://www.drupal.org/node/3492429)
  - [Update phase replacement](https://www.drupal.org/node/3490852)
  - [Runtime phase replacement](https://www.drupal.org/node/3490851)

- template_preprocess_HOOK

  - [template_preprocess_HOOK replacement as theme hook callbacks](https://www.drupal.org/node/3504125)

- hook_module_implements_alter

  - [Ordering hooks](https://www.drupal.org/node/3493962)
  - [Removing hooks](https://www.drupal.org/node/3496786)
  - [Reordering hooks](https://www.drupal.org/node/3497308)
  - [#\[LegacyModuleImplementsAlter\] attribute](https://www.drupal.org/node/3496788)

- hook_hook_info (Removed in Drupal 12)

  - [hook_hook_info removal notes](https://www.drupal.org/node/3489765)

Most hook helper functions should move to a utility service or method on the hook class using it.

### Other procedural functions

Other functions should be moved to services.

If your module has functions other projects rely on, add a deprecation warning for those functions and have them call the service replacing them.

Some functions are generally safe to replace without BC.

- [hook implementations](https://www.drupal.org/node/3442349)
- hook helper functions
- [form callbacks](https://www.drupal.org/node/3548821)
- [batch callbacks](https://www.drupal.org/node/3570904)

### Converting your module's code with rector

A [rector rule with a helpful DDEV script exists](https://gitlab.com/-/snippets/5975084) to assist with converting hooks. It will convert all hooks with the correct `Implements hook_foo()` documentation.

You can use [https://search.tresbien.tech/](https://search.tresbien.tech/) to gauge your module's function's usage across Drupal contrib.

There is an attribute `#[ExtensionFileIsConverted]` that can be used to silence any deprecations once the .module file is fully converted. This attribute is only needed if you must maintain the .module file for backwards compatibility purposes.\
Note: The attribute only disables the upcoming deprecation message, the files will all no longer be auto-loaded in Drupal 13.

*Source: [The .module file extension has been deprecated](https://www.drupal.org/node/3619765), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
