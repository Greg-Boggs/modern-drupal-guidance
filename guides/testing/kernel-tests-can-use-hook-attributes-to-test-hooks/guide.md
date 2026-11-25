---
name: kernel-tests-can-use-hook-attributes-to-test-hooks
title: "Kernel tests can use hook attributes to test hooks"
description: "Kernel tests can use hook attributes to test hooks"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3553794
change-record-nid: 3553794
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3502432](https://www.drupal.org/node/3502432)

Kernel tests can declare hook implementations to add hook testing. For example if you want to test hook_node_create() you can add the following method to your kernel test class:

```php
  /**
   * Implements hook_ENTITY_TYPE_create() for node entities.
   */
  #[Hook('node_create')]
  public function nodeCreate(): void {
    // Some logic.
  }
```

Note that hooks declared in Kernel tests do not support the hook ordering / removal capabilities.

*Source: [Kernel tests can use hook attributes to test hooks](https://www.drupal.org/node/3553794), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
