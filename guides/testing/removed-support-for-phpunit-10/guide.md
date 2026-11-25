---
name: removed-support-for-phpunit-10
title: "Removed support for PHPUnit 10"
description: "Removed support for PHPUnit 10"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3546970
change-record-nid: 3546970
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3537104](https://www.drupal.org/node/3537104), [#3535662](https://www.drupal.org/node/3535662), [#3530453](https://www.drupal.org/node/3530453)

Framework support for testing with PHPUnit 10 is removed.

Core and contrib can only run tests with PHPUnit 11.

Test classes using annotation metadata still work under PHPUnit 11, but throw PHPUnit deprecations that lead to CI job failures if appropriately set up. It is **strongly recommended** to convert annotations to attributes as described in [Tests with PHPUnit 10 attributes are now supported](https://www.drupal.org/node/3447698).

Drupal 11 core has completed migration of tests from annotation to attributes in [#3535662: \[meta\] Convert test metadata from annotations to attributes](https://www.drupal.org/project/drupal/issues/3535662).

Support for annotation metadata will be only completely removed in PHPUnit 12. However, it is possible that preparation issues to support it during Drupal 11 lifecycle may lead to the testing framework stop working properly if annotations are still in use.

*Source: [Removed support for PHPUnit 10](https://www.drupal.org/node/3546970), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
