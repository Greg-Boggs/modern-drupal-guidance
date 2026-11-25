---
name: test-methods-consolidated-in-entityresourcetestbase
title: "Test methods consolidated in EntityResourceTestBase"
description: "Test methods consolidated in EntityResourceTestBase"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3578858
change-record-nid: 3578858
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3575888](https://www.drupal.org/node/3575888)

Public methods on `EntityResourceTestBase` have been moved to protected methods on the class:

```php
 ::testGet()
 ::testPost()
 ::testPatch()
 ::testDelete()
```

```php
 ::doTestGet()
 ::doTestPost()
 ::doTestPatch()
 ::doTestDelete()
```

These protected methods are now called by a single public ::testCrud() method.

Contrib tests that subclass ResourceTestBase should not need to make any changes unless they override one of these specific methods.

*Source: [Test methods consolidated in EntityResourceTestBase](https://www.drupal.org/node/3578858), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
