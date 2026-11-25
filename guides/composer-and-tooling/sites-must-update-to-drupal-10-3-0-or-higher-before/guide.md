---
name: sites-must-update-to-drupal-10-3-0-or-higher-before
title: "Sites must update to Drupal 10.3.0 or higher before updating to Drupal 11.x"
description: "Sites must update to Drupal 10.3.0 or higher before updating to Drupal 11.x"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3442097
change-record-nid: 3442097
introduced-in-version: "11.0.0"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0\
Issue links: [#3439769](https://www.drupal.org/node/3439769)

Drupal 11 has removed update hooks added prior to Drupal 10.3. Sites must therefore update to Drupal 10.3.0 or higher, prior to updating to Drupal 11.0.0. Sites are also encouraged to update contributed modules and themes while they are on 10.3.0, prior to updating to Drupal 11.

Updating Drupal core to 10.3.0, along with contributed modules to their latest stable versions, ensures the smallest changes when performing the Drupal 10 to Drupal 11 update itself, which results in a more reliable and predictable upgrade path than attempting to skip multiple minor versions at once.

*Source: [Sites must update to Drupal 10.3.0 or higher before updating to Drupal 11.x](https://www.drupal.org/node/3442097), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
