---
name: sites-must-update-to-drupal-11-3-0-or-higher-before
title: "Sites must update to Drupal 11.3.0 or higher before updating to Drupal 12.x"
description: "Sites must update to Drupal 11.3.0 or higher before updating to Drupal 12.x"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3585783
change-record-nid: 3585783
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3580877](https://www.drupal.org/node/3580877)

Drupal 12 has removed update hooks added prior to Drupal 11.3. Sites must therefore update to Drupal 11.3.0 or higher, prior to upgrading to Drupal 12.0.0. Sites are also encouraged to update contributed modules and themes while they are on 11.3.0, prior to upgrading to Drupal 12.

Updating Drupal core to 11.3.0, along with contributed modules to their latest stable versions, ensures the smallest changes when performing the Drupal 11 to Drupal 12 upgrade itself, which results in a more reliable and predictable upgrade path than attempting to skip multiple minor versions at once.

*Source: [Sites must update to Drupal 11.3.0 or higher before updating to Drupal 12.x](https://www.drupal.org/node/3585783), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
