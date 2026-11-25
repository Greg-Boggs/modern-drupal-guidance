---
name: manual-user-creation-now-emails-users-by-default
title: "Manual user creation now emails users by default"
description: "Manual user creation now emails users by default"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3569591
change-record-nid: 3569591
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3481627](https://www.drupal.org/node/3481627)

When manually creating a user account via the user creation form, email notification is now enabled by default using the option “Email user with password setup instructions”.

With this option selected, the password and status fields are hidden, reflecting that the user will complete account setup via the emailed instructions.

Administrators can disable the email option if they prefer to manually set the password and account status, in which case the form behaves as before.

*Source: [Manual user creation now emails users by default](https://www.drupal.org/node/3569591), a Drupal core change record by [sergiur](https://www.drupal.org/user/3543272) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
