---
name: native-void-return-types-added-to-methods-previously
title: "Native void return types added to methods previously documented with @return void"
description: "Native void return types added to methods previously documented with @return void"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3636331
change-record-nid: 3636331
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3579889](https://www.drupal.org/node/3579889)

Most methods that were documented with `@return void` now declare a native `: void` return type. Classes that implement or override these methods must add `: void` to their method signature, or PHP will throw a fatal error.

### Interfaces

- `\Drupal\node\NodeGrantDatabaseStorageInterface::alterQuery()`

### Classes

- `\Drupal\Component\Diff\DiffFormatter`: `_block()`, `_start_diff()`, `_start_block()`, `_end_block()`, `_lines()`, `_context()`, `_added()`, `_deleted()`, `_changed()`
- `\Drupal\Core\Diff\DiffFormatter`: overrides of the methods above
- `\Drupal\block\BlockPluginCollection::addInstanceId()`
- `\Drupal\Component\Annotation\Doctrine\StaticReflectionParser::parse()`

### Test traits

- `\Drupal\Tests\PerformanceTestTrait::assertCountBetween()`

Adding `: void` is compatible with Drupal 11, so modules can make this change now without dropping 11.x support.

*Source: [Native void return types added to methods previously documented with @return void](https://www.drupal.org/node/3636331), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
