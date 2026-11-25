---
name: phpstan-rule-tests-use-the-latest-version-of-the-package
title: "PHPStan rule tests use the latest version of the package"
description: "PHPStan rule tests use the latest version of the package"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3634419
change-record-nid: 3634419
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3631365](https://www.drupal.org/node/3631365)

PHPStan rule tests in the namespace `Drupal\PHPStan\Tests` now run on the latest version of PHPStan.

Previously, the custom `composer.json` for these tests pinned the dependency to a specific version, for example `"phpstan/phpstan": "2.2.14"`. Meanwhile, `DevDependencies/composer.json` set a minimum version for PHPStan, for example `"phpstan/phpstan": "^2.2.14"`. This discrepancy caused test failures when updating PHPStan to new versions.

Now both dependencies are set to a minimum version.

*Source: [PHPStan rule tests use the latest version of the package](https://www.drupal.org/node/3634419), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
