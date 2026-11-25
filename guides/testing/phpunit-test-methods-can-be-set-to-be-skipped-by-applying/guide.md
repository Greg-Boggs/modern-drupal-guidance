---
name: phpunit-test-methods-can-be-set-to-be-skipped-by-applying
title: "PHPUnit test methods can be set to be skipped by applying Skip attribute"
description: "PHPUnit test methods can be set to be skipped by applying Skip attribute"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3615361
change-record-nid: 3615361
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3517430](https://www.drupal.org/node/3517430)

A new PHP attribute, `\Drupal\TestTools\Attribute\Skip` is available to mark PHPUnit test methods to be skipped. Using the new attribute is preferred instead of calling `\PHPUnit\Framework\Assert::markTestSkipped()`. The presence of the attribute is checked before Drupal is bootstrapped in Kernel and Functional tests, providing a performance improvement when the test is skipped.

Before:

```php
public function testFoo(): void {
  $this->markTestSkipped('Information about why the test is skipped.');
  // Test code.
}

public function testBar(): void {
  $this->markTestSkipped();
  // Test code.
}
```

After:

```php
#[Skip('Information about why the test is skipped.')]
public function testFoo(): void {
  // Test code.
}

#[Skip]
public function testBar(): void {
  // Test code.
}
```

*Source: [PHPUnit test methods can be set to be skipped by applying Skip attribute](https://www.drupal.org/node/3615361), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
