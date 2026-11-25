---
name: postgresql-truncate-queries-now-emit-truncate-inside
title: "PostgreSQL truncate queries now emit TRUNCATE inside transactions"
description: "PostgreSQL truncate queries now emit TRUNCATE inside transactions"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3615246
change-record-nid: 3615246
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3615225](https://www.drupal.org/node/3615225)

On PostgreSQL, truncate queries now emit a `TRUNCATE` statement in all cases, including inside a transaction. `\Drupal\pgsql\Driver\Database\pgsql\Truncate` now overrides `__toString()`.

Previously, `\Drupal\Core\Database\Query\Truncate::__toString()` emitted `DELETE FROM` when a transaction was active. MySQL needs that fallback because its `TRUNCATE` is a DDL statement and causes an implicit commit. On PostgreSQL, `TRUNCATE` is transactional and can be rolled back, so the fallback is not needed.

`TRUNCATE` is faster than `DELETE FROM` on large tables. It also leaves no dead rows behind for autovacuum to clean up.

### Behavior notes

`TRUNCATE` takes an `ACCESS EXCLUSIVE` lock on the table, held until the transaction ends. It is not MVCC-safe for concurrent transactions using a snapshot taken before the truncation. Code that casts a truncate query to a string on PostgreSQL now gets `TRUNCATE` instead of `DELETE FROM` inside transactions.

No API changes. `Connection::truncate()` and the `Truncate` query builder are unchanged.

*Source: [PostgreSQL truncate queries now emit TRUNCATE inside transactions](https://www.drupal.org/node/3615246), a Drupal core change record by [daffie](https://www.drupal.org/user/116368) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
