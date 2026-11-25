---
name: kernel-tests-can-share-the-test-environment
title: "Kernel tests can share the test environment"
description: "Kernel tests can share the test environment"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3623403
change-record-nid: 3623403
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#1411074](https://www.drupal.org/node/1411074)

A kernel test class builds its fixture again for every test method. The new `#[ShareEnvironment]` attribute (`Drupal\TestTools\Attribute\ShareEnvironment`) allows to opt into a new mode where Kernel tests build the environment once and share it among test methods. A class without the attribute keeps the old behavior in Drupal 12. The goal is to flip the default behavior in Drupal 13.

A pair of new methods are now available to override:

- The `::setUpEnvironment()` method runs just once per test class and allows to perform all the setup tasks required by the test class as a whole. Before, these tasks were typically performed in the `::setUp()` method, which is still available for any setup task needing to run for each test method.
- The `::resetEnvironment()` method allows to perform cleanup tasks before the next test method runs.

Every test method still runs in its own process, so properties assigned in `::setUpEnvironment()` are reset every time. Any data shared among test methods need to be loaded from the database. Only database state is shared. The site directory belongs to the test method. For more information see the [guidelines for test methods sharing the environment](https://www.drupal.org/docs/develop/automated-testing/phpunit-in-drupal/setup-tasks-in-kernel-tests#s-the-test-environment).

### Before

```php
#[RunTestsInSeparateProcesses]
class MyKernelTest extends KernelTestBase {

  protected static $modules = ['node'];

  protected EntityStorageInterface $nodeStorage;

  protected function setUp(): void {
    parent::setUp();
    $this->installEntitySchema('node');
    $this->installConfig(['node']);
    $this->nodeStorage = $this->container->get('entity_type.manager')->getStorage('node');
  }

  public function testNodeIsSaved(): void {
    $node = $this->nodeStorage->create(['type' => 'page', 'title' => 'Test']);
    $node->save();
    $this->assertSame(1, (int) $node->id());
  }

}
```

### After

```php
#[RunTestsInSeparateProcesses]
#[ShareEnvironment]
class MyKernelTest extends KernelTestBase {

  protected static $modules = ['node'];

  protected EntityStorageInterface $nodeStorage;

  protected function setUpEnvironment(): void {
    parent::setUpEnvironment();
    $this->installEntitySchema('node');
    $this->installConfig(['node']);
  }

  protected function setUp(): void {
    parent::setUp();
    $this->nodeStorage = $this->container->get('entity_type.manager')->getStorage('node');
  }

  public function testNodeIsSaved(): void {
    $node = $this->nodeStorage->create(['type' => 'page', 'title' => 'Test']);
    $node->save();
    $this->assertNotNull($this->nodeStorage->load($node->id()));
  }

}
```

A class that needs its own environment states it:

```php
#[ShareEnvironment(FALSE)]
class MySchemaTest extends KernelTestBase {
```

*Source: [Kernel tests can share the test environment](https://www.drupal.org/node/3623403), a Drupal core change record by [plach](https://www.drupal.org/user/183211) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
