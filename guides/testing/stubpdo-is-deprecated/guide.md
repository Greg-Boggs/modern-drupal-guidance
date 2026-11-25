---
name: stubpdo-is-deprecated
title: "StubPDO is deprecated"
description: "StubPDO is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3611435
change-record-nid: 3611435
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3585476](https://www.drupal.org/node/3585476)

The `StubPDO` class for testing database connections has been deprecated. Create PHPUnit stub objects from the `PDO` class directly instead.

Before:

```php
$stub = $this->createStub(StubPDO::class);
```

After:

```php
$stub = $this->createStub(\PDO::class);
```

*Source: [StubPDO is deprecated](https://www.drupal.org/node/3611435), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
