---
name: view-mode-dependencies-are-recalculated
title: "View mode dependencies are recalculated"
description: "View mode dependencies are recalculated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3608081
change-record-nid: 3608081
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2865710](https://www.drupal.org/node/2865710)

Display and form view mode configuration dependencies are recalculated to ensure all dependencies are recorded.

View modes implement widget plugins which may have module dependencies. Previously, if a view mode implemented the same widget multiple times with different dependencies, then only one of those dependencies would be saved in the configuration's dependency list. This could cause situations where a module could be uninstalled without warning that a configuration depended on it.

Site owners must ensure that updates are executed after upgrading to get the recalculated dependencies.

*Source: [View mode dependencies are recalculated](https://www.drupal.org/node/3608081), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
