---
name: user-new-user
title: "Creating a User Account"
description: "How to create a user account."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/user-new-user.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Create Vendor user accounts for Sweet Honey and Happy Farm vendors.
## Prerequisite knowledge

* {{ GUIDE_REF("user-concept") }}
* {{ GUIDE_REF("user-admin-account") }}
* {{ GUIDE_REF("user-new-role") }}
## Site prerequisites

The Vendor role must exist on your site. See {{ GUIDE_REF("user-new-role") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _People_ (_admin/people_).
1. Click _Add user_.
    ![Form for creating a new user account](https://www.drupal.org/docs/user_guide/en/images/user-new-user_form.png)
1. Fill in the form fields. See the table below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Email address | A valid email address for the vendor. All emails from the system will be sent to this address. The email address is not made public. | honey@example.com |
    | Username | A username for the vendor that they will use to sign in or author content items. Spaces are allowed; punctuation is not allowed except for periods, hyphens, apostrophes, and underscores. | Sweet Honey |
    | Password | A password the vendor will use to sign in to the site. You can see how safe the password is on the _Password strength_ gauge. You also get tips on how to make it safer. | (Make a secure password) |
    | Confirm password | Type the same password to avoid any typing mistakes. | (Repeat password) |
    | Status | Set the status of the user account. _Blocked_ users will not be able to sign in. | Active |
    | Roles | Set the role of the user account. | Vendor |
    | Notify user of new account | Whether or not to send a notification to the vendor's email address. | Checked |
    | Picture | Click _Browse_ and select a picture to upload. Pay attention to size restrictions. | Photo of the vendor |
    | Contact settings | Enable or disable the display of a contact form for the account. | Checked |

1. Click _Create new account_. You will get a notification about the user account
    creation.
    ![New user account has been created](https://www.drupal.org/docs/user_guide/en/images/user-new-user-created.png)
1. Create a second Vendor account for Happy Farm by following the steps above.

## Expand your understanding

Create a user account for yourself.
## Videos

[Creating a User Account](https://www.youtube.com/watch?v=2UtEtY9Cgaw)

*Attributions*

Written by [Diána Lakatos](https://www.drupal.org/u/dianalakatos)
at [Pronovix](https://pronovix.com/).

*Source: [Creating a User Account](https://www.drupal.org/docs/user_guide/en/user-new-user.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
