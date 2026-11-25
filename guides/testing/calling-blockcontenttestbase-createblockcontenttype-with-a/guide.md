---
name: calling-blockcontenttestbase-createblockcontenttype-with-a
title: "Calling BlockContentTestBase::createBlockContentType with a string for the block values is deprecated"
description: "Calling BlockContentTestBase::createBlockContentType with a string for the block values is deprecated"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3473739
change-record-nid: 3473739
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3196937](https://www.drupal.org/node/3196937)

Deprecate the string code path for values parameter in `BlockContentTestBase::createBlockContentType` with a string for the first parameter is deprecated. The first parameter, `$values`, must be an array.

#### Before

`$this->createBlockContentType('test_block');`

#### After

`$this->createBlockContentType(['id' => 'test_block']);`

*Source: [Calling BlockContentTestBase::createBlockContentType with a string for the block values is deprecated](https://www.drupal.org/node/3473739), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
