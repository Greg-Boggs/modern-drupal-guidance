---
name: procedural-hooks-are-ordered-before-object-oriented-hooks
title: "Procedural hooks are ordered before object oriented hooks for a given module"
description: "Procedural hooks are ordered before object oriented hooks for a given module"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3515207
change-record-nid: 3515207
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3485896](https://www.drupal.org/node/3485896)

### Background

The order of hook implementations for a hook follows the order of the modules that provide these implementations.\
This module order is based on module weights and alphabetical order of module machine names, and it can be altered with hook_module_implements_alter().

Since [#3485896: Hook ordering across OOP, procedural and with extra types i.e replace hook_module_implements_alter](https://www.drupal.org/project/drupal/issues/3485896), the order of individual implementations can be changed with newly introduced attributes, or with a new parameter in the #\[Hook\] attribute. (see other change records).

**Before**\
When one module provides multiple implementations for the same hook, their order relative to each other is not guaranteed. It depends on the order of discovery, which can be system-dependent.

Especially, when one module provides one procedural hook implementation and one or more OOP hook implementations for the *same hook*, it is not guaranteed whether the procedural implementation will run first, last, or in between the OOP implementations.

**After**\
When invoking a hook, any procedural hook implementation will be executed before any OOP hook implementations *of the same module*, unless overridden by order settings in attributes.

### Example

Prior to this change, hook implementations of hook_myhook() might be ordered like this:

- module_a_myhook()
- Drupal\module_a\Hook\Hooks::myHook()
- Drupal\module_b\Hook\Hooks::myHook()
- module_b_myhook()

After this change, they would be ordered like this:

- module_a_myhook()
- Drupal\module_a\Hook\Hooks::myHook()
- module_b_myhook()
- Drupal\module_b\Hook\Hooks::myHook()

*Source: [Procedural hooks are ordered before object oriented hooks for a given module](https://www.drupal.org/node/3515207), a Drupal core change record by [donquixote](https://www.drupal.org/user/459338) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
