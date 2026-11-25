---
name: workspaces-no-longer-creates-a-stage-workspace-on
title: "Workspaces no longer creates a \"Stage\" workspace on installation"
description: "Workspaces no longer creates a \"Stage\" workspace on installation"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3527964
change-record-nid: 3527964
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3527314](https://www.drupal.org/node/3527314)

Workspaces no longer creates a default 'Stage' workspace when it is installed.

This will not affect existing sites, but it could affect contrib modules or install profiles that rely implicitly on the workspace existing.

*Source: [Workspaces no longer creates a "Stage" workspace on installation](https://www.drupal.org/node/3527964), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
