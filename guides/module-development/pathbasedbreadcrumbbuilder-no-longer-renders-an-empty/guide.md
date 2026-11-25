---
name: pathbasedbreadcrumbbuilder-no-longer-renders-an-empty
title: "PathBasedBreadcrumbBuilder no longer renders an empty breadcrumb for paths without a title"
description: "PathBasedBreadcrumbBuilder no longer renders an empty breadcrumb for paths without a title"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3541758
change-record-nid: 3541758
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3344200](https://www.drupal.org/node/3344200)

Previously, the PathBasedBreadcrumbBuilder would add breadcrumbs for paths in the trail that contained an empty title, resulting in a breadcrumb with no link. Now these paths are excluded from the list of breadcrumbs entirely.

*Source: [PathBasedBreadcrumbBuilder no longer renders an empty breadcrumb for paths without a title](https://www.drupal.org/node/3541758), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
