---
name: legacy-hook-functions-are-now-attributed-to-the-current
title: "Legacy hook functions are now attributed to the current module instead of the most specific match"
description: "Legacy hook functions are now attributed to the current module instead of the most specific match"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3548085
change-record-nid: 3548085
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3502302](https://www.drupal.org/node/3502302)

When scanning for legacy procedural hooks Drupal will now by default attribute hook functions to the current module and only check for other modules if the function does not start with the current module name.

In the vast majority of cases this will have no effect since this is by far the most common way hooks are implemented.

Previously, it attributed hook functions to the longest module name that it could match them against, this resulted in hooks incorrectly being attributed to submodules if a function name overlapped with that name.

E.g. if both paragraphs and paragraphs_library were installed and the former implemented pararaphs_library_info_alter.\
Instead of the paragraphs module and library_info_alter hook Drupal would register it as the paragraphs_library module and info_alter hook.

One side effect of this change is that a parent module can no longer implement a hook on behalf of a submodule if the parent module name prefixes the submodule since the first check will always match.

Note: Implementing hooks for another module is discouraged and may be removed in the future. It is now possible for a module to implement a hook more than once with OOP hooks and [#3524377: Allow to skip OOP hooks and services for modules that are not installed](https://www.drupal.org/project/drupal/issues/3524377) will allow to add a formal dependency on another module and register it conditionally.

*Source: [Legacy hook functions are now attributed to the current module instead of the most specific match](https://www.drupal.org/node/3548085), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
