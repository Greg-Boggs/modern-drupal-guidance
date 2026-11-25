---
name: functions-in-update-module-have-been-deprecated
title: "Functions in update.module have been deprecated"
description: "Functions in update.module have been deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3592959
change-record-nid: 3592959
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3580703](https://www.drupal.org/node/3580703)

The following functions have been deprecated:

- \_update_message_text
- \_update_no_data
- \_update_project_status_sort
- update_create_fetch_task
- update_fetch_data
- update_fetch_data_finished
- update_get_available
- update_refresh
- update_storage_clear

#### List of the replacements for these functions.

| Deprecated function | Method |
| --- | --- |
| \_update_message_text | \Drupal\update\UpdateMessageTrait::getText() |
| \_update_no_data | \Drupal\update\UpdateMessageTrait::noData() |
| \_update_project_status_sort | No replacement |
| update_create_fetch_task | \Drupal\update\UpdateProcessor::createFetchTask() |
| update_fetch_data | \Drupal\update\UpdateProcessor::fetchData() |
| update_fetch_data_finished | No replacement |
| update_get_available | \Drupal\update\UpdateManager::getAvailable() |
| update_refresh | \Drupal\update\UpdateManager::refreshUpdateData() |
| update_storage_clear | \Drupal\update\UpdateManager::reset() |

*Source: [Functions in update.module have been deprecated](https://www.drupal.org/node/3592959), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
