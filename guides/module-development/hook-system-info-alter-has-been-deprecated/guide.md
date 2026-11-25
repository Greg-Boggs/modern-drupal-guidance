---
name: hook-system-info-alter-has-been-deprecated
title: "hook_system_info_alter has been deprecated"
description: "hook_system_info_alter has been deprecated"
drupal-core: ">=12.1"
source-url: https://www.drupal.org/node/3624723
change-record-nid: 3624723
introduced-in-version: "12.1.0"
introduced-in-branch: "12.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.1.x\
Introduced in version: 12.1.0\
Issue links: [#3623862](https://www.drupal.org/node/3623862)

`hook_system_info_alter` has been deprecated, use `hook_extension_info_alter` instead

Modules that need to support multiple core versions may implement both hooks. In most cases this is unlikely to cause problems, e.g. if altering one key to another value. If running twice will cause a problem, use a class property to check if the hook has run already, or another condition to prevent altering a second time.

*Source: [hook_system_info_alter has been deprecated](https://www.drupal.org/node/3624723), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
