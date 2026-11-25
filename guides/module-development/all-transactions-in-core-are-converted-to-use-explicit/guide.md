---
name: all-transactions-in-core-are-converted-to-use-explicit
title: "All transactions in core are converted to use explicit ::commitOrRelease(), implicit commit-on-destruct is deprecated"
description: "All transactions in core are converted to use explicit ::commitOrRelease(), implicit commit-on-destruct is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3524461
change-record-nid: 3524461
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3495728](https://www.drupal.org/node/3495728), [#3406985](https://www.drupal.org/node/3406985), [#3583849](https://www.drupal.org/node/3583849), [#3584238](https://www.drupal.org/node/3584238)

Drupal by default was committing a database transaction when its Transaction object goes out of scope, during the Transaction object destruction.

The new `Transaction::commitOrRelease()` method is now being used all across Drupal's core codebase to **explicitly** perform a commit/savepoint release operation on a database transaction.

Besides:

- The implicit commit on Transaction destruction behaviour is deprecated, and its implementation will be removed in Drupal 13.

- The methods introduced in [#3405976: Transaction autocommit during shutdown relies on unreliable object destruction order (xdebug 3.3+ enabled)](https://www.drupal.org/project/drupal/issues/3405976) are deprecated for removal in Drupal 13, without replacement:

  - `Connection::commitAll()`
  - `Database::commitAllOnShutdown()`
  - `TransactionManagerBase::commitAll()`

- The following methods in `Drupal\pgsql\Driver\Database\pgsql\Connection` are deprecated for removal in Drupal 13:

  - `::addSavepoint()` replaced by `Connection::startTransaction()`
  - `::releaseSavepoint()` replaced by `Transaction::commitOrRelease()`
  - `::rollbackSavepoint()` replaced by `Transaction::rollback()`

Read [Transaction::commitOrRelease() method introduced to explicit commit a transaction](https://www.drupal.org/node/3512006) for before/after examples.

*Source: [All transactions in core are converted to use explicit ::commitOrRelease(), implicit commit-on-destruct is deprecated](https://www.drupal.org/node/3524461), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
