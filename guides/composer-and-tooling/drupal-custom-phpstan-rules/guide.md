---
name: drupal-custom-phpstan-rules
title: "Drupal custom PHPStan rules"
description: "Drupal custom PHPStan rules"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3444866
change-record-nid: 3444866
introduced-in-version: "11.0.0"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0\
Issue links: [#3400366](https://www.drupal.org/node/3400366)

Drupal custom PHPStan rules are now available at `core/tests/PHPStan`.

### Subdirectories

- Rules: contains the actual rules.
- tests: contains PHPUnit tests for the rules. Note that these tests are run separately from Drupal core tests, since they rely on PHPStan testing framework that differs in terms of dependencies from Drupal's one.
- fixtures: contains fixture files for the PHPUnit tests of the rules.

### Enabling rules

Rules are executed when they are added to the the phpstan.neon(.dist) configuration file of a PHPStan scan run. You need to add them under the \`rules\` entry in the file, specifying the fully qualified class name of the rule. For example:

```php
rules:
  - Drupal\PHPStan\Rules\ComponentTestDoesNotExtendCoreTest
```

*Source: [Drupal custom PHPStan rules](https://www.drupal.org/node/3444866), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
