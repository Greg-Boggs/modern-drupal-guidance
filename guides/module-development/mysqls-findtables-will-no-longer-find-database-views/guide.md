---
name: mysqls-findtables-will-no-longer-find-database-views
title: "MySQL's findTables() will no longer find database views"
description: "MySQL's findTables() will no longer find database views"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3531733
change-record-nid: 3531733
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3362726](https://www.drupal.org/node/3362726)

The MySQL driver's schema object has been fixed to behave the same as SQLite and PostgresQL's and no longer list database views in the output of `\Drupal::database()->schema()->findTables()`. Additionally, `\Drupal::database()->schema()->tableExists('database view')` will now return FALSE.

*Source: [MySQL's findTables() will no longer find database views](https://www.drupal.org/node/3531733), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
