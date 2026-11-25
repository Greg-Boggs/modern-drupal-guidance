---
name: phpunit-11-support
title: "PHPUnit 11 support"
description: "PHPUnit 11 support"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3521395
change-record-nid: 3521395
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3418267](https://www.drupal.org/node/3418267)

PHPUnit 11 can now be used for testing. While the shipped version remains PHPUnit 10, it's possible to update to PHPUnit via `composer update phpunit/phpunit --with-dependencies`.

Drupal core testing on PHP 8.4 requires PHPUnit 11 as a minimum, and automatically updates the version in the GitLab test runs.

Note that until [#3497431: Deprecate TestDiscovery test file scanning, use PHPUnit API instead](https://www.drupal.org/project/drupal/issues/3497431) is committed, using test attributes introduced in PHPUnit 10 (replacing test annotations) is not yet fully supported.

*Source: [PHPUnit 11 support](https://www.drupal.org/node/3521395), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
