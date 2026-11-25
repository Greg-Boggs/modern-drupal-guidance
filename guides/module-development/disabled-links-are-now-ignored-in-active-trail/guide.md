---
name: disabled-links-are-now-ignored-in-active-trail
title: "Disabled links are now ignored in active trail"
description: "Disabled links are now ignored in active trail"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3544512
change-record-nid: 3544512
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2973515](https://www.drupal.org/node/2973515)

Before this change, Drupal did not check if the matching menu link was enabled or disabled when retrieving the active menu trail.\
This could lead to several problems when a menu link is disabled, such as an "active" class inappropriately set on a parent menu link, or issues with contrib modules like Menu Breadcrumb.

Disabled menu links are now ignored when building the active trail.

*Source: [Disabled links are now ignored in active trail](https://www.drupal.org/node/3544512), a Drupal core change record by [prudloff](https://www.drupal.org/user/3611858) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
