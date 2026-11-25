---
name: plugins-used-in-kernel-tests-need-all-dependent-modules-to
title: "Plugins used in kernel tests need all dependent modules to be installed in order to be discovered"
description: "Plugins used in kernel tests need all dependent modules to be installed in order to be discovered"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3539877
change-record-nid: 3539877
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2786355](https://www.drupal.org/node/2786355)

For any plugin used in a kernel test, all modules that have code that the plugin's class inherits from must be explicitly installed in the kernel test in order for the plugin to be discovered.

Using `Node` entity type as an example, any kernel test that uses nodes must have both the `node` and `user` modules installed.

**Before**

```php
class NodeExampleTest extends KernelTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = ['node'];
  ...

  public function testExample(): void {
    $node = \Drupal::entitTypeManager()->loadStorage('node')->create([
      ...
    ]);
    ...
  }
  
}
```

**After**

```php
class NodeExampleTest extends KernelTestBase {

 /**
   * {@inheritdoc}
   */
  protected static $modules = ['node', 'user'];
  ...

  public function testExample(): void {
    $node = \Drupal::entitTypeManager()->loadStorage('node')->create([
      ...
    ]);
    ...
  }
  
}
```

Adding `user` to `$modules` in this example is necessary because the `Node` entity type class uses `Drupal\user\EntityOwnerTrait` in the `user` module. And while the `node` module has `drupal:text` defined as a dependency in `node.info.yml`, and thus `drupal:filter` and `drupal:user` as part of the dependency chain, in kernel tests, modules listed in the `$modules` property are installed without implicitly installing their dependencies.

*Source: [Plugins used in kernel tests need all dependent modules to be installed in order to be discovered](https://www.drupal.org/node/3539877), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
