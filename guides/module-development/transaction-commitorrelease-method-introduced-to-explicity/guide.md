---
name: transaction-commitorrelease-method-introduced-to-explicity
title: "Transaction::commitOrRelease() method introduced to explicity commit a transaction"
description: "Transaction::commitOrRelease() method introduced to explicity commit a transaction"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3512006
change-record-nid: 3512006
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3398767](https://www.drupal.org/node/3398767)

Drupal by default commits a transaction when its Transaction object goes out of scope, during the Transaction object destruction.

This is a pattern that deviates from normal PHP behaviour, where explicit commit is required and without explicit commit an uncompleted transaction is rolled back. Also, recently this behaviour caused problems when the destruction order of objects is not predictable (see [#3405976: Transaction autocommit during shutdown relies on unreliable object destruction order (xdebug 3.3+ enabled)](https://www.drupal.org/project/drupal/issues/3405976)).

A new `Transaction::commitOrRelease()` method is added to the Transaction object, to mean **explicit** commit/savepoint release.

*::commitOrRelease()* indicates that the transaction control is returned to the parent level in a nested transaction scenario like Drupal's - e.g. a 'savepoint' transaction object returns control to its parent 'root' transaction (that can still be rolled back entirely if necessary); a 'root' transaction returns control to the database by committing (=persisting changed data) the db transaction, etc.

**Before**

```php
    try {
      $transaction = $this->connection->startTransaction();
      foreach ($this->insertValues as $insert_values) {
        $stmt->execute($insert_values, $this->queryOptions);
        ...
      }
    }
    catch (\Exception $e) {
      if (isset($transaction)) {
        // One of the INSERTs failed, rollback the whole batch.
        $transaction->rollBack();
      }
      // Rethrow the exception for the calling code.
      throw $e;
    }
```

**After**

```php
    $transaction = $this->connection->startTransaction();
    try {
      foreach ($this->insertValues as $insert_values) {
        $stmt->execute($insert_values, $this->queryOptions);
        ...
      }
      $transaction->commitOrRelease();
    }
    catch (\Exception $e) {
      // One of the INSERTs failed, rollback the whole batch and rethrow the exception for the calling code.
      $transaction->rollBack();
      throw $e;
    }
```

*Source: [Transaction::commitOrRelease() method introduced to explicity commit a transaction](https://www.drupal.org/node/3512006), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
