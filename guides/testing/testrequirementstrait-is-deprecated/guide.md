---
name: testrequirementstrait-is-deprecated
title: "TestRequirementsTrait is deprecated"
description: "TestRequirementsTrait is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3574112
change-record-nid: 3574112
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3573954](https://www.drupal.org/node/3573954), [#3589047](https://www.drupal.org/node/3589047), [#3590435](https://www.drupal.org/node/3590435)

`Drupal\Tests\TestRequirementsTrait` has been subject to deprecations and removals in last majors, and is now deprecated itself. The `::getDrupalRoot()` method is also deprecated.

Calling the `::getDrupalRoot()` method is no longer necessary, tests extending Drupal base classes can access directly `$this->root` that is automatically initialized during the test set-up.

Example

Before:

```php
    $this->root = static::getDrupalRoot();
    chdir($this->root);
```

After:

```php
    chdir($this->root);
```

*Source: [TestRequirementsTrait is deprecated](https://www.drupal.org/node/3574112), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
