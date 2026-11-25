---
name: user-role-grant-permissions-user-role-revoke-permissions
title: "user_role_grant_permissions(), user_role_revoke_permissions() and user_role_change_permissions() are deprecated"
description: "user_role_grant_permissions(), user_role_revoke_permissions() and user_role_change_permissions() are deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3348027
change-record-nid: 3348027
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2025089](https://www.drupal.org/node/2025089)

The following functions have been deprecated:\
`user_role_grant_permissions()`\
`user_role_revoke_permissions()`\
`user_role_change_permissions()`

`RoleInterface` has three new methods to replace the functions.

- `grantPermissions`
- `changePermissions`
- `revokePermissions`

It is important to use the `loadOverrideFree` method when interacting with permissions.

**Before:**

```php
user_role_grant_permissions(RoleInterface::ANONYMOUS_ID, [
      'access comments',
      'post comments',
      'skip comment approval',
    ]);
```

**After:**

```php
Role::loadOverrideFree(RoleInterface::ANONYMOUS_ID)->grantPermissions([
      'access comments',
      'post comments',
      'skip comment approval',
    ])->save()
```

**Before:**

```php
user_role_revoke_permissions(RoleInterface::ANONYMOUS_ID, ['skip comment approval']);
```

**After:**

```php
Role::loadOverrideFree(RoleInterface::ANONYMOUS_ID)->revokePermissions([
      'skip comment approval',
    ])->save();
```

**Before:**

```php
user_role_change_permissions(RoleInterface::ANONYMOUS_ID, [
      'access comments' => TRUE,
      'post comments' => TRUE,
      'skip comment approval' => FALSE,
    ]);
```

**After:**

```php
Role::loadOverrideFree(RoleInterface::ANONYMOUS_ID)->changePermissions([
      'access comments' => TRUE,
      'post comments' => TRUE,
      'skip comment approval' => FALSE,
    ])->save();
```

*Source: [user_role_grant_permissions(), user_role_revoke_permissions() and user_role_change_permissions() are deprecated](https://www.drupal.org/node/3348027), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
