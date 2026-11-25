---
name: the-postgresql-override-of-entityquery-is-now-in-the-pgsql
title: "The PostgreSQL override of entityQuery is now in the pgsql module"
description: "The PostgreSQL override of entityQuery is now in the pgsql module"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3488580
change-record-nid: 3488580
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3488572](https://www.drupal.org/node/3488572)

The PostgreSQL override of the entityQuery is moved to the pgsql module. The PostgreSQL override of the entityQuery now lives in the namespace `Drupal\pgsql\EntityQuery`.

The 2 classes `Drupal\Core\Entity\Query\Sql\pgsql\QueryFactory` and `Drupal\Core\Entity\Query\Sql\pgsql\Condition` are deprecated and will be removed before Drupal 12.0.0.

This is continuation of moving database drivers, and the specific code, to their own module.

*Source: [The PostgreSQL override of entityQuery is now in the pgsql module](https://www.drupal.org/node/3488580), a Drupal core change record by [daffie](https://www.drupal.org/user/116368) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
