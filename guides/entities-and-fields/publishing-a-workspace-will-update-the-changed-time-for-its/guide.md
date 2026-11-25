---
name: publishing-a-workspace-will-update-the-changed-time-for-its
title: "Publishing a workspace will update the changed time for its entities"
description: "Publishing a workspace will update the changed time for its entities"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3531039
change-record-nid: 3531039
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3531037](https://www.drupal.org/node/3531037)

Starting with Drupal 11.3.0, publishing a workspace will update the changed timestamp for its entities.

Calling the `\Drupal\workspaces\WorkspacePublisher` or `\Drupal\workspaces\WorkspaceOperationFactory` constructor without the `$time` argument is deprecated. The `$time` argument is required in Drupal 12.

*Source: [Publishing a workspace will update the changed time for its entities](https://www.drupal.org/node/3531039), a Drupal core change record by [amateescu](https://www.drupal.org/user/729614) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
