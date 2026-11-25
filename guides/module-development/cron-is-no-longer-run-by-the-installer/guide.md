---
name: cron-is-no-longer-run-by-the-installer
title: "Cron is no longer run by the installer"
description: "Cron is no longer run by the installer"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3497839
change-record-nid: 3497839
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2422681](https://www.drupal.org/node/2422681)

Cron is no longer run as part of installing Drupal. Installs that enable the automated_cron module will have cron run when they visit the frontpage.

If tests rely on cron being run then the test must run cron itself.

*Source: [Cron is no longer run by the installer](https://www.drupal.org/node/3497839), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
