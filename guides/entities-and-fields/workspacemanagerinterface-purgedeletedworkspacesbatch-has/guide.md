---
name: workspacemanagerinterface-purgedeletedworkspacesbatch-has
title: "WorkspaceManagerInterface::purgeDeletedWorkspacesBatch() has been deprecated"
description: "WorkspaceManagerInterface::purgeDeletedWorkspacesBatch() has been deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3553582
change-record-nid: 3553582
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3553581](https://www.drupal.org/node/3553581)

`WorkspaceManagerInterface::purgeDeletedWorkspacesBatch()` has been deprecated with no replacement.

It's code has been moved to `\Drupal\workspaces\Hook\WorkspacesHooks::cron()`, which can be called manually if needed.

*Source: [WorkspaceManagerInterface::purgeDeletedWorkspacesBatch() has been deprecated](https://www.drupal.org/node/3553582), a Drupal core change record by [amateescu](https://www.drupal.org/user/729614) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
