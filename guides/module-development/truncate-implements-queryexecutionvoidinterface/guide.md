---
name: truncate-implements-queryexecutionvoidinterface
title: "Truncate implements QueryExecutionVoidInterface"
description: "Truncate implements QueryExecutionVoidInterface"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3569194
change-record-nid: 3569194
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3569137](https://www.drupal.org/node/3569137)

TRUNCATE's `::execute()` method is currently returning an integer value, but that is fragile:

```php
  /**
   * Executes the TRUNCATE query.
   *
   * In most cases, TRUNCATE is not a transaction safe statement as it is a DDL
   * statement which results in an implicit COMMIT. When we are in a
   * transaction, fallback to the slower, but transactional, DELETE.
   * PostgreSQL also locks the entire table for a TRUNCATE strongly reducing
   * the concurrency with other transactions.
   *
   * @return int|null
   *   Return value is dependent on whether the executed SQL statement is a
   *   TRUNCATE or a DELETE. TRUNCATE is DDL and no information on affected
   *   rows is available. DELETE is DML and will return the number of affected
   *   rows. In general, do not rely on the value returned by this method in
   *   calling code.
   *
   * @see https://learnsql.com/blog/difference-between-truncate-delete-and-drop-table-in-sql
   */
  public function execute() { ...
```

The `Truncate` class has now been changed to implement a new `QueryExecutionVoidInterface` that is ensuring `::execute` not to return any value.

```php
/**
 * General class for an abstracted TRUNCATE operation.
 */
class Truncate extends Query implements QueryExecutionVoidInterface {

...

  /**
   * Executes the TRUNCATE query.
   *
   * In most cases, TRUNCATE is not a transaction safe statement as it is a DDL
   * statement which results in an implicit COMMIT. When we are in a
   * transaction, fallback to the slower, but transactional, DELETE.
   * PostgreSQL also locks the entire table for a TRUNCATE strongly reducing
   * the concurrency with other transactions.
   *
   * @see https://learnsql.com/blog/difference-between-truncate-delete-and-drop-table-in-sql
   */
  public function execute(): void { ...
```

*Source: [Truncate implements QueryExecutionVoidInterface](https://www.drupal.org/node/3569194), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
