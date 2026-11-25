---
name: user-permissions
title: "Assigning Permissions to a Role"
description: "How to assign a permission to a role."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/user-permissions.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Change the permissions for the Vendor role so that users can create, edit,
and delete Recipe and Vendor content, format the content, and contact each
other.
## Prerequisite knowledge

* {{ GUIDE_REF("user-concept") }}
## Site prerequisites

The Vendor role must exist on your site. See {{ GUIDE_REF("user-new-role") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _People_ > _Roles_
    (_admin/people/roles_). The _Roles_ page appears.
1. Click _Edit permissions_ in the dropdown for the Vendor
    role. The _Edit role_ page appears where you can see all the available
    actions for the website such as, for example, _Post comments_ or _Administer
    blocks_. The available permissions depend on the modules that are installed in
    the site. Note: Some permissions may have security implications. Be cautious
    while assigning permissions to roles.
1. Check the boxes for the following permissions, listed by module:

    | Module | Permission |
    | --- | --- |
    | Contact | Use users' personal contact forms |
    | Filter | Use the Restricted HTML text format |
    | Node | Recipe: Create new content |
    | Node | Recipe: Edit own content |
    | Node | Recipe: Delete own content |
    | Node | Vendor: Edit own content |


    ![Granting users with the Vendor role the rights to create, delete and edit Recipes](https://www.drupal.org/docs/user_guide/en/images/user-permissions-check-permissions.png)

1. Click _Save permissions_. You will get a message saying your changes have been
    saved.
    ![Confirmation message after updating permissions](https://www.drupal.org/docs/user_guide/en/images/user-permissions-save-permissions.png)

## Expand your understanding

* Log in as one of the new users you created in {{ GUIDE_REF("user-new-user") }}. Verify
whether you have the correct permissions.
* {{ GUIDE_REF("user-roles") }}
## Related concepts

{{ GUIDE_REF("user-admin-account") }}
## Videos

[Assigning Permissions to a Role](https://www.youtube.com/watch?v=IlVh9f4BHVw)

## Additional resources

[_Drupal.org_ community documentation page "Managing Users"](https://www.drupal.org/docs/7/managing-users)

*Attributions*

Adapted and edited by [Boris Doesborg](https://www.drupal.org/u/batigolix),
[Brian Emery](https://www.drupal.org/u/bemery987),
and [Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com),
and [Joe Shindelar](https://www.drupal.org/u/eojthebrave) at
[Drupalize.Me](https://drupalize.me), from
["User Roles"](https://www.drupal.org/docs/7/managing-users/user-roles),
copyright 2000-2026 by the individual contributors to the
[Drupal Community Documentation](https://www.drupal.org/documentation).

*Source: [Assigning Permissions to a Role](https://www.drupal.org/docs/user_guide/en/user-permissions.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
