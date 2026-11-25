---
name: functions-in-update-compare-inc-are-deprecated
title: "Functions in update.compare.inc are deprecated"
description: "Functions in update.compare.inc are deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3587768
change-record-nid: 3587768
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3580705](https://www.drupal.org/node/3580705)

The following functions have been deprecated:

- `update_process_project_info`
- `update_calculate_project_data`
- `update_calculate_project_update_status`

**Before:**\
`update_calculate_project_data($available)`\
**After:**\
`\Drupal::service(UpdateManagerInterface::class)->calculateProjectData($available)`

The `UpdateCalculator` service is internal.

**Before:**\
`update_process_project_info(&$projects)`\
**After:**\
`\Drupal::service(UpdateCalculator::class)->processProjectInfo($projects)`

**Before:**\
`update_calculate_project_update_status(&$project_data, $available)`\
**After:**

```php
$project_data = \Drupal::service(UpdateCalculator::class)
  ->updateProjectStatus(
    UpdateProject::createFromArray($project_data),
    UpdateServerProjectInfo::createFromArray($available)
  )
  ->toArray();
```

There is a new `UpdateProject` value object for managing the project information.\
There is a new `UpdateServerProjectInfo` value object for managing available update information.

*Source: [Functions in update.compare.inc are deprecated](https://www.drupal.org/node/3587768), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
