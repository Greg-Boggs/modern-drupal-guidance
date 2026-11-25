---
name: automated-cron-is-no-longer-triggered-for-cli-requests
title: "Automated cron is no longer triggered for CLI requests"
description: "Automated cron is no longer triggered for CLI requests"
drupal-core: ">=11.3.6"
source-url: https://www.drupal.org/node/3576653
change-record-nid: 3576653
introduced-in-version: "11.3.6"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.6\
Issue links: [#3576648](https://www.drupal.org/node/3576648)

Automated cron is no longer triggered for CLI requests. This has the potential to significantly speed up some deployment steps that may be inadvertently triggering cron. If you are relying on CLI triggering automated cron, see [Cron automated tasks overview](https://www.drupal.org/docs/administering-a-drupal-site/cron-automated-tasks/cron-automated-tasks-overview) for recommended ways to manage cron.

*Source: [Automated cron is no longer triggered for CLI requests](https://www.drupal.org/node/3576653), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
