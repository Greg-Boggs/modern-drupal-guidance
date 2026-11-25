---
name: there-is-a-new-tasksinterface-for-profiles-and-hook-install
title: "There is a new TasksInterface for profiles and hook_install_tasks and hook_install_tasks_alter are deprecated"
description: "There is a new TasksInterface for profiles and hook_install_tasks and hook_install_tasks_alter are deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3623397
change-record-nid: 3623397
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3623380](https://www.drupal.org/node/3623380)

The following hooks have been deprecated.

- `hook_install_tasks`
- `hook_install_tasks_alter`

Replacements must implement `Drupal\Core\Extension\Install\TasksInterface`\
It must be in the `Drupal\profile_name\Install\Tasks` namespace.\
If an OOP version exists procedural version will not run so profiles can keep the procedural version for compatibility with older Drupal versions.

They must have a `getTasks` and `alter` method.

You can implement the ContainerInjectionInterface to inject core services.

*Source: [There is a new TasksInterface for profiles and hook_install_tasks and hook_install_tasks_alter are deprecated](https://www.drupal.org/node/3623397), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
