---
name: the-user-entity-member-for-extra-field-is-deprecated
title: "The User entity 'member_for' extra field is deprecated"
description: "The User entity 'member_for' extra field is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3611943
change-record-nid: 3611943
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2638250](https://www.drupal.org/node/2638250)

The "Member for" (`member_for`) extra field on the User entity view display is deprecated in 11.5.0 and will be removed in Drupal 13.0.0. Instead, use the `created` field, which has been made configurable on the display.

For sites upgrading to Drupal 11.5.0 or 12.0, the "Member for" extra field will continue to be displayed as previously configured, and the `created` field will be set as hidden on the display. This allows existing site theming to work as expected. Manual action can then be taken to configure the `created` field to be displayed and the `member_for` extra field to be hidden.

New Drupal installations of 11.5 or 12.0 have the `created` already configured to be displayed but set to hidden as default, and the `member_for` extra field is hidden as well. This means on a new installation, no field data will be configured to be displayed on the user page. Site builders can customize the display after installation.

*Source: [The User entity 'member_for' extra field is deprecated](https://www.drupal.org/node/3611943), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
