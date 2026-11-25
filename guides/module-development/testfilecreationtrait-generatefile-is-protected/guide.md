---
name: testfilecreationtrait-generatefile-is-protected
title: "TestFileCreationTrait::generateFile() is protected"
description: "TestFileCreationTrait::generateFile() is protected"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3467531
change-record-nid: 3467531
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3467278](https://www.drupal.org/node/3467278)

`TestFileCreationTrait::generateFile()` was mistakenly made a public method when the test was added, this method has been moved to protected instead. Tests using the trait should be unaffected, only code instantiating a class which uses the trait then calling the method would be affected but this is outside normal testing usage.

*Source: [TestFileCreationTrait::generateFile() is protected](https://www.drupal.org/node/3467531), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
