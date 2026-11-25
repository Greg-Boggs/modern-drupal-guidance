---
name: cursor-offset-and-orientation-arguments-in
title: "Cursor offset and orientation arguments in StatementInterface::fetch() are deprecated"
description: "Cursor offset and orientation arguments in StatementInterface::fetch() are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3551924
change-record-nid: 3551924
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3522561](https://www.drupal.org/node/3522561)

Cursor offset and orientation arguments in `StatementInterface::fetch()` are untested and likely not working.

Their usage is now triggering a deprecation, and the arguments will be removed in Drupal 12.

Before:

```php
$connection->query("SELECT * FROM {node}")->fetch(FetchAs::Associative, 1, 1);
```

After:

```php
$connection->query("SELECT * FROM {node}")->fetch(FetchAs::Associative);
```

*Source: [Cursor offset and orientation arguments in StatementInterface::fetch() are deprecated](https://www.drupal.org/node/3551924), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
