---
id: cr-transaction-commit
title: Commit a database transaction explicitly
kind: code
guides: [transaction-commitorrelease-method-introduced-to-explicity]
---

Create a module called `bench_tx` in `web/modules/custom` and turn it on. `writePair($a, $b)` on `bench_tx.writer` stores two rows in the `key_value` table (collection `bench_tx`, names `a` and `b`, values PHP-serialized). Both rows are saved or neither: if one insert fails, nothing is kept. By the time the method returns, the work must be committed.
