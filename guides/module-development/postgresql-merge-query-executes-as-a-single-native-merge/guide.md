---
name: postgresql-merge-query-executes-as-a-single-native-merge
title: "PostgreSQL merge query executes as a single native merge query"
description: "PostgreSQL merge query executes as a single native merge query"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3615213
change-record-nid: 3615213
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3315265](https://www.drupal.org/node/3315265)

### PostgreSQL merge queries now execute as a single native MERGE statement

On PostgreSQL, `$connection->merge($table)->...->execute()` now runs one native `MERGE` statement. Before this change, the driver used the generic emulation: a SELECT followed by an INSERT or an UPDATE. The native statement uses `RETURNING merge_action()` to report the action taken.

Return values are unchanged: `Merge::STATUS_INSERT`, `Merge::STATUS_UPDATE`, or `NULL` when the row existed and no update was requested. Modules need no code changes.

The generic emulation is still used when:

- the condition targets a table other than the merge table;
- there are no fields to insert;
- values are inserted into serial fields.

When a concurrent transaction inserts the same row during the merge, the statement is retried once. The racing row is then matched and updated.

Casting a pgsql merge query to a string now returns the MERGE SQL when the native path applies. It throws for the emulated path, as before.

Other database drivers are unaffected.

*Source: [PostgreSQL merge query executes as a single native merge query](https://www.drupal.org/node/3615213), a Drupal core change record by [daffie](https://www.drupal.org/user/116368) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
