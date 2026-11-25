---
name: accessing-this-container-from-functional-tests-is-deprecated
title: "Accessing $this->container from functional tests is deprecated"
description: "Accessing $this->container from functional tests is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3492500
change-record-nid: 3492500
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2066993](https://www.drupal.org/node/2066993)

Accessing `$this->container` from Functional tests is deprecated.

Use `\Drupal::service()` or `\Drupal::getContainer()` instead

*Source: [Accessing $this->container from functional tests is deprecated](https://www.drupal.org/node/3492500), a Drupal core change record by [larowlan](https://www.drupal.org/user/395439) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
