---
name: view-linked-label-operation-added-to-user-entity
title: "'View linked label' operation added to user entity"
description: "'View linked label' operation added to user entity"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3565758
change-record-nid: 3565758
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3506444](https://www.drupal.org/node/3506444)

The user entity access control handler now handles the `'view linked label'` operation (see `Drupal\user\UserAccessControlHandler::checkAccess()`).

The intent of this entity operation is to determine whether a `username` theme element can be displayed as a link to the user profile. It differs from the `'view'` operation in that it disregards whether a user is viewing their username, and in doing so, does not require the `user` cache context.

For example, the previous expected functionality was:

- All users with the 'access user profiles' permission see any node author name linked to the author's profile
- Any user viewing a node they authored sees the author name linked to their own profile
- All users not in the first two groups see the node author name as static text

Now, the expected functionality is:

- All users with the 'access user profiles' permission see any node author name linked to the author's profile
- All users without the 'access user profiles' permission see the node author name as static text

*Source: ['View linked label' operation added to user entity](https://www.drupal.org/node/3565758), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
