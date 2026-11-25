---
name: most-procedural-hook-implementations-have-been-converted-to
title: "Most procedural hook implementations have been converted to a hook class"
description: "Most procedural hook implementations have been converted to a hook class"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3486534
change-record-nid: 3486534
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3483599](https://www.drupal.org/node/3483599)

Hooks that core supports OOP implementations for have been converted from procedural to OOP.

Hooks are moved to a class depending on the file name.

- views.module → src/Hook/ViewsHooks.php
- views.tokens.inc → src/Hook/ViewsTokensHooks.php

If there is a pre-existing filename then a number is incremented on the end. If a .module or .inc file is empty after conversion it has been deleted. If you called hook implementations directly you will now need to invoke the hook.

### Before

`block_rebuild();`

### After

#### Example 1

`\Drupal::service('module_handler')->invoke('block', 'rebuild');`

#### Example 2

`$this->moduleHandler->invoke('block', 'rebuild');`

Invoke does take the args so if you need to pass arguments do it as you normally would:\
`$this->moduleHandler->invoke($module, $hook, $args);`

Invoke has a legacy fallback, so it is safe to invoke hooks for modules that have not yet converted to OOP hooks.\
It handles the `#LegacyHook` attribute properly so modules that have implemented OOP hooks in a backwards compatible way will not have duplicate calls.

### Exception to the conversion in core

We undo or prevent conversions for some specific tests:

1. core/tests/fixtures/empty_file.php.module it is testing empty .module so we cannot remove it.
2. core/modules/system/tests/modules/deprecation_test it is testing deprecated procedural hooks so we must keep them until there are no more.
3. core/modules/system/tests/modules/module_test this is testing loading order of .module and .inc files so we must keep it.
4. core/tests/Drupal/Tests/Core/Extension/modules/module_handler_test_all1/module_handler_test_all1.module this is used to test hook ordering in mixed scenarios
5. core/tests/Drupal/Tests/Core/Extension/modules/module_handler_test_all2/module_handler_test_all2.module this is used to test hook ordering in mixed scenarios
6. Any new tests covering procedural specific functionality

The conversion used implements comment to identify hook implementations so any that were not documented would not be converted.

*Source: [Most procedural hook implementations have been converted to a hook class](https://www.drupal.org/node/3486534), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
