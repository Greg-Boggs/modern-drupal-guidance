---
name: module-inc-module-set-weight-and-module-config-sort-are
title: "module.inc, module_set_weight and module_config_sort are deprecated"
description: "module.inc, module_set_weight and module_config_sort are deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3595653
change-record-nid: 3595653
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3595652](https://www.drupal.org/node/3595652)

The module.inc file and functions are deprecated and will be removed in Drupal 13.

**Before**\
`module_set_weight`

**After**\
`\Drupal::service(ModuleWeight::class)->set()`

**Before**\
`module_config_sort`

**After**\
`\Drupal::service(ModuleWeight::class)->sort()`

`use Drupal\Core\Extension\ModuleWeight;`

*Source: [module.inc, module_set_weight and module_config_sort are deprecated](https://www.drupal.org/node/3595653), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
