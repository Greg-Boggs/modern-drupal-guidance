---
name: the-service-created-by-getcontainerwithcachetagsinvalidator
title: "The service created by getContainerWithCacheTagsInvalidator() must be used"
description: "The service created by getContainerWithCacheTagsInvalidator() must be used"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3580268
change-record-nid: 3580268
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3578904](https://www.drupal.org/node/3578904)

`UnitTestCase::getContainerWithCacheTagsInvalidator()` provides an easy, standardized way to set up a service container in unit tests that is pre-built for invalidating cache tags. The returned container is a PHPUnit `MockObject` upon which you can set expectations for whether it is utilized.

Previously, a default expectation of `any()` was set on the the container's `get()` method, meaning that the test did not care whether the method was used or not. But `any()` is deprecated in PHPUnit 12.5 and higher. The Drupal community is working to remove it from Core. In `getContainerWithCacheTagsInvalidator()` this expectation has been replaced by `atLeastOnce()`, which means that the container MUST be used in a way that `get()` is called for the `cache_tags.invalidator` service.

This has implications for large, complex test classes. In some cases the container may be created in the test's `setUp()` method, then be unused in many of the test's functions. Because the container must be used now, this pattern will no longer work. You must only set up the container when it is going to be used by a test.

Before:

```php
class ExampleTest extends UnitTestCase {

  protected function setUp()
    \Drupal::setContainer($this->getContainerWithCacheTagsInvalidator());
  }

  public function testThatUsesContainer() {
    \Drupal::getContainer()->get('cache_tags.invalidator');
  }

  public function testThatDoesntUseContainer() {
    // Don't use the container.
  }

}
```

After:

```php
class ExampleTest extends UnitTestCase {

  public function testThatUsesContainer() {
    \Drupal::setContainer($this->getContainerWithCacheTagsInvalidator());
    \Drupal::getContainer()->get('cache_tags.invalidator');
  }

  public function testThatDoesntUseContainer() {
    // Don't use the container.
  }

}
```

*Source: [The service created by getContainerWithCacheTagsInvalidator() must be used](https://www.drupal.org/node/3580268), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
