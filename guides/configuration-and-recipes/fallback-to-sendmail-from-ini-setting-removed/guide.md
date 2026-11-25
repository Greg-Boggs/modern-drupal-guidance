---
name: fallback-to-sendmail-from-ini-setting-removed
title: "Fallback to sendmail_from ini setting removed"
description: "Fallback to sendmail_from ini setting removed"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3579264
change-record-nid: 3579264
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3579153](https://www.drupal.org/node/3579153)

When sending transactional mail it is required to set an appropriate `From` address. This address is taken from `system.site:mail` configuration value. That config value has been a required value for new installs since Drupal 8.

Nevertheless, a fallback to the [sendmail_from](https://www.php.net/manual/en/mail.configuration.php#ini.sendmail-from) ini setting was present in various places throughout core (e.g., in `MailManager`). This fallback has been removed.

*Source: [Fallback to sendmail_from ini setting removed](https://www.drupal.org/node/3579264), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
