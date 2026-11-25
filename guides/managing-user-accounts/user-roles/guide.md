---
name: user-roles
title: "Changing a User's Roles"
description: "How to change or add roles for a user."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/user-roles.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Change or add roles to a given user, either by editing a single-user or by
applying a bulk operation.
## Prerequisite knowledge

{{ GUIDE_REF("user-concept") }}
## Site prerequisites

The user account that you want to update, and the role you want it to have, must
already exist. See {{ GUIDE_REF("user-new-user") }},  {{ GUIDE_REF("user-new-role") }}, and
{{ GUIDE_REF("user-permissions") }}.
## Steps
### Updating the roles using single-user editing method

1. In the _Manage_ administrative menu, navigate to _People_
    (_admin/people_).
1. Locate the user 1 account (named "admin") to assign it the _Administrator_
    role. If it is not immediately visible, use the _Name or email contains_ filter,
    or other filters, to narrow down the list.
1. Click _Edit_ to update the user account.
    ![People page](https://www.drupal.org/docs/user_guide/en/images/user-roles_people-list.png)
1. On the _Edit_ page, scroll down to _Roles_ section. Check the _Administrator_
    role for the user account.
    ![Roles section of user edit page](https://www.drupal.org/docs/user_guide/en/images/user-roles_person-edit.png)
1. Click _Save_ to update the user account. You should be returned to the
    _People_ page and see a message saying that the changes have been saved.
    ![Confirmation message](https://www.drupal.org/docs/user_guide/en/images/user-roles_message.png)

### Updating the roles using bulk editing method

1. If the users Happy Farm and Sweet Honey did not already have the Vendor role,
    here is how you would add it. In the _Manage_ administrative menu, navigate to
    _People_ (_admin/people_).
1. Locate Vendor user accounts  _Sweet Honey_ and _Happy Farm_ and check them. If
    they are not immediately visible, use the _Name or email contains_ filter, or
    other filters, to narrow down the list.
1. Select _Add the Vendor role to the selected user(s)_ from the _Action_
    select list.
    ![People page with bulk operation set up](https://www.drupal.org/docs/user_guide/en/images/user-roles_bulk.png)
1. Click _Apply to selected items_. You should see a message indicating that the
    desired changes were made.
    ![Confirmation message](https://www.drupal.org/docs/user_guide/en/images/user-roles_message_bulk.png)

## Videos

[Changing a User's Roles](https://www.youtube.com/watch?v=hd7Sr3-n9ME)

*Attributions*

Written by [Chris Dart](https://www.drupal.org/u/chris-dart)
and [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon)

*Source: [Changing a User's Roles](https://www.drupal.org/docs/user_guide/en/user-roles.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
