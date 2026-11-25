---
name: database-queries-can-no-longer-be-serialized
title: "Database queries can no longer be serialized"
description: "Database queries can no longer be serialized"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3625908
change-record-nid: 3625908
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3625895](https://www.drupal.org/node/3625895)

`\Drupal\Core\Database\Query\Query::__wakeup()` and `\Drupal\Core\Database\Query\Query::__sleep()` are deprecated in Drupal 11.x and will be removed in Drupal 12.

This means that database queries can no longer be serialized or unserialized.

This brings the Query class into alignment with the rest of the Database API.

*Source: [Database queries can no longer be serialized](https://www.drupal.org/node/3625908), a Drupal core change record by [mcdruid](https://www.drupal.org/user/255969) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
