---
name: usage-of-pdo-fetch-constants-to-indicate-fetch-mode-is
title: "Usage of \\PDO::FETCH_* constants to indicate fetch mode is deprecated"
description: "Usage of \\PDO::FETCH_* constants to indicate fetch mode is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3488338
change-record-nid: 3488338
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3487851](https://www.drupal.org/node/3487851)

In [#3345938: Deprecate support for unused \PDO::FETCH\_\* modes](https://www.drupal.org/project/drupal/issues/3345938), we normalized the fetch modes used in Drupal's database operations. However, we fell short of introducing our own logic to indicate the fetch mode, and kept using `\PDO::FETCH*` constants for the purpose.

Now a new `FetchAs` enum provides the supported modes. Usage of `\PDO::FETCH_*` constants in method calls outside of database driver code is deprecated.

The new `Drupal\Core\Database\Statement\FetchAs` values and the `\PDO::FETCH_*` constants they are replacing:

| FETCH\_\* constant | Replace with |
| --- | --- |
| \PDO::FETCH_ASSOC | Drupal\Core\Database\Statement\FetchAs::Associative |
| \PDO::FETCH_CLASS \| \PDO::FETCH_PROPS_LATE | Drupal\Core\Database\Statement\FetchAs::ClassObject |
| \PDO::FETCH_COLUMN | Drupal\Core\Database\Statement\FetchAs::Column |
| \PDO::FETCH_NUM | Drupal\Core\Database\Statement\FetchAs::List |
| \PDO::FETCH_OBJ | Drupal\Core\Database\Statement\FetchAs::Object |

NOTE: An unintended side-effect of the deprecation assertion logic is to disallow the previously-allowed option to pass a class name as a string to functions like `fetchAllAssoc()`. Starting in Drupal 11.2, these need to be migrated to a separate call to `setFetchMode()`.

*Source: [Usage of \PDO::FETCH\_\* constants to indicate fetch mode is deprecated](https://www.drupal.org/node/3488338), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
