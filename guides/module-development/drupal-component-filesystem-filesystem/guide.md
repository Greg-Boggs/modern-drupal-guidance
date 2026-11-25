---
name: drupal-component-filesystem-filesystem
title: "\\Drupal\\Component\\FileSystem\\FileSystem::getOsTemporaryDirectory() checks the directory returned by sys_get_temp_dir() before /tmp and windows specific directories"
description: "\\Drupal\\Component\\FileSystem\\FileSystem::getOsTemporaryDirectory() checks the directory returned by sys_get_temp_dir() before /tmp and windows specific directories"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3586712
change-record-nid: 3586712
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3586645](https://www.drupal.org/node/3586645)

`\Drupal\Component\FileSystem\FileSystem::getOsTemporaryDirectory()` now checks the directory returned by `sys_get_temp_dir()` before `'/tmp'`. This can result in temporary files being created in a different location.

*Source: [\Drupal\Component\FileSystem\FileSystem::getOsTemporaryDirectory() checks the directory returned by sys_get_temp_dir() before /tmp and windows specific directories](https://www.drupal.org/node/3586712), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
