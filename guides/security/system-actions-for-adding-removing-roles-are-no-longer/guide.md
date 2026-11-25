---
name: system-actions-for-adding-removing-roles-are-no-longer
title: "System actions for adding/removing roles are no longer created via hook_ENTITY_TYPE_insert()"
description: "System actions for adding/removing roles are no longer created via hook_ENTITY_TYPE_insert()"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3522105
change-record-nid: 3522105
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2672340](https://www.drupal.org/node/2672340)

The hook `hook_ENTITY_TYPE_insert()` no longer creates system actions for adding and removing roles from a user when a user role is created. The actions are `system.action.user_add_role_action.<role_id>` and `system.action.user_remove_role_action.<role_id>`.

These actions can now be added via the configuration API, either through configuration synchronization or as configuration entities included in an install profile or a recipe.

`user_add_role` and `user_remove_role` system actions are still automatically created when a role is created via the Drupal admin UI.

*Source: [System actions for adding/removing roles are no longer created via hook_ENTITY_TYPE_insert()](https://www.drupal.org/node/3522105), a Drupal core change record by [joegraduate](https://www.drupal.org/user/789384) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
