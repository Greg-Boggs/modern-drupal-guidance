---
name: includes-for-hook-hook-info-implementations-have-been
title: "Includes for hook_hook_info implementations have been deprecated."
description: "Includes for hook_hook_info implementations have been deprecated."
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3489765
change-record-nid: 3489765
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2233261](https://www.drupal.org/node/2233261), [#3540033](https://www.drupal.org/node/3540033)

## Important notice

If your module ***implements*** `hook_hook_info() `, e.g. `my_module_hook_info() `, then you should **not** remove that function until the minimum Drupal version you require is Drupal 12. Also, you must not use the skip_procedural_hook_scan services parameter ([https://www.drupal.org/node/3490771](https://www.drupal.org/node/3490771)), as otherwise this legacy hook is no longer discovered.

If you are seeing this deprecation that means you have a file such as my_module.tokens.inc.\
Core provides one for tokens and on for views. Contrib has support for more files.

You will need to move any functions in those files out of the files and delete the files.

There are two main options for handling this.

### Short term fix

Move all functions to the .module file.

### Longer term fix

Convert any hooks to `#[Hook]` implementations. If you need to support Drupal &lt; 11.1 then you will need the `#[LegacyHook]` implementation as well, but move the legacy hook to the .module file.\
Any helper functions will need evaluation. If only one hook or hook class uses them you can move it to a method on the Hook class.\
If multiple Hook classes or modules consume the helper you will want to make it a service.

See [support for object oriented hook implementations using autowired services](https://www.drupal.org/node/3442349) for more information.

#### Alternative

If you need to keep the file, then you will need to manually include it after Drupal 12.

*Source: [Includes for hook_hook_info implementations have been deprecated.](https://www.drupal.org/node/3489765), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
