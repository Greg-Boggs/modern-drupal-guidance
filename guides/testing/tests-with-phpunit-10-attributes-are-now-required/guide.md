---
name: tests-with-phpunit-10-attributes-are-now-required
title: "Tests with PHPUnit 10 attributes are now required"
description: "Tests with PHPUnit 10 attributes are now required"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3581981
change-record-nid: 3581981
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3527936](https://www.drupal.org/node/3527936)

PHPUnit 10 introduced PHP 8 attributes as a replacement for annotations. Annotations are no longer supported in PHPUnit 12.

Drupal 12 no longer supports versions of PHPUnit less than 12. Automated tests that only contain obsolete PHPUnit annotations will no longer function correctly. If you are adding support for Drupal 12 while maintaining support for other prior versions, then you may include attributes in addition to the existing annotations. Refer to [the original change record when Drupal Core added support for PHPUnit attributes](https://www.drupal.org/node/3447698) for information on how to convert your annotations to attributes.

Drupal Core's custom PHPStan rules for detecting the obsolete annotations will be retained until at least Drupal 13. If your test suite executes PHPStan as part of its linting processes it can help you identify annotations for conversion. The PHPStan rules must be added to your module's `phpstan.neon` file:

```php
rules:
  - Drupal\PHPStan\Rules\TestClassClassMetadata
  - Drupal\PHPStan\Rules\TestClassMethodMetadata
```

*Source: [Tests with PHPUnit 10 attributes are now required](https://www.drupal.org/node/3581981), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
