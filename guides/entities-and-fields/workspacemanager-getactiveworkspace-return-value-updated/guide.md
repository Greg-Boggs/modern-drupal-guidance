---
name: workspacemanager-getactiveworkspace-return-value-updated
title: "WorkspaceManager::getActiveWorkspace() return value updated"
description: "WorkspaceManager::getActiveWorkspace() return value updated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3553092
change-record-nid: 3553092
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3095414](https://www.drupal.org/node/3095414)

The return value of `WorkspaceManager::getActiveWorkspace()` when there is no active workspace was previously undocumented (it returned `FALSE`). This has been changed and documented to return `NULL` instead.

This change was made to enable better use of null-safe operators and type hints. For example, when you need to execute a method on the active workspace, instead of a conditional block using `hasActiveWorkspace()`, the code be simplified to:

```php
$active_workspace_id = $this->workspaceManager->getActiveWorkspace()?->id();
```

*Source: [WorkspaceManager::getActiveWorkspace() return value updated](https://www.drupal.org/node/3553092), a Drupal core change record by [amateescu](https://www.drupal.org/user/729614) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
