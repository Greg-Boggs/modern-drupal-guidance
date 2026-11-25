---
name: dblog-filters-and-dblog-get-message-types-have-been
title: "dblog_filters and _dblog_get_message_types have been deprecated."
description: "dblog_filters and _dblog_get_message_types have been deprecated."
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3560399
change-record-nid: 3560399
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3560398](https://www.drupal.org/node/3560398)

`dblog_filters` and `_dblog_get_message_types` have been deprecated.

Use `\Drupal::service(\Drupal\dblog\DbLogFilters::class)->filters()` or `\Drupal::service(\Drupal\dblog\DbLogFilters::class)->getMessageTypes()` as needed.

The file `core/modules/dblog/dblog.admin.inc` has also been deprecated.

*Source: [dblog_filters and \_dblog_get_message_types have been deprecated.](https://www.drupal.org/node/3560399), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
