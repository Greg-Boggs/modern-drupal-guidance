---
name: functionaltestsetuptrait-installmodulesfromclassproperty-is
title: "FunctionalTestSetupTrait::installModulesFromClassProperty() is deprecated"
description: "FunctionalTestSetupTrait::installModulesFromClassProperty() is deprecated"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3616201
change-record-nid: 3616201
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3614825](https://www.drupal.org/node/3614825)

`FunctionalTestSetupTrait::installModulesFromClassProperty()` has been deprecated with no replacement. Modules specified in the $modules class property are now installed alongside other modules in the Drupal installer, instead of in a separate step after Drupal is installed.

In some cases test classes may want to dynamically change the list of classes installed via the class property, this can be achieved by overriding the new `FunctionalTestSetupTrait::getModulesFromClassProperty()` method.

The private method `doInstallModulesFromClassProperty` has been removed from `PerformanceTestTrait`.

*Source: [FunctionalTestSetupTrait::installModulesFromClassProperty() is deprecated](https://www.drupal.org/node/3616201), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
