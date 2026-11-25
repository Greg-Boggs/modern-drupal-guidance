---
name: run-tests-sh-uses-phpunits-api-to-determine-the-tests-to-run
title: "run-tests.sh uses PHPUnit's API to determine the tests to run"
description: "run-tests.sh uses PHPUnit's API to determine the tests to run"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3530388
change-record-nid: 3530388
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3497431](https://www.drupal.org/node/3497431)

`run-tests.sh` was using a bespoke algorithm to determine the list of tests to run; this was a legacy of simpletest times.

PHPUnit now has a public API that allows apps to wrap part of its routines, see [Wrapping the Test Runner](https://docs.phpunit.de/en/10.5/extending-phpunit.html#wrapping-the-test-runner).

`run-tests.sh` has now been changed to discover the list of tests to execute using PHPUnit's API. This is a much more accurate process, because

1. It deals natively with both legacy annotation and the new attributes for test metadata - thus effectively enabling the Drupal test codebase to use attributes
2. It executes the data providers methods, and then includes in the discovery list as many test cases as the number of datasets provided for a test method, thus determining the exact number of test cases to be run for each test class - which is relevant for ordering test execution sequence.
3. It shows details of warnings generated during the test discovery, which can be used to increase the test codebase quality - but it can cause discovered tests to be skipped from execution if they would fail.

Some examples of warnings and how they can be addressed:

`* PHPUnit\Event\TestRunner\WarningTriggered: Cannot add file /builds/project/drupal/core/modules/config/tests/config_test/tests/src/Functional/Rest/ConfigTestJsonAnonTest.php to test suite "functional" as it was already added to test suite "functional"`

This is due to duplicate file paths in the `phpunit.xml` configuration file, in the `<testsuite>` `<directory>` section: the same file is matched by multiple entries.

```php
* PHPUnit\Event\Test\PhpunitErrorTriggered: The data provider specified for Drupal\Tests\Composer\Generator\BuilderTest::testBuilder is invalid
Class "Drupal\Composer\Composer" not found
/builds/project/scheduler/web/core/lib/Drupal/Core/Test/PhpUnitTestDiscovery.php:147
/builds/project/scheduler/web/core/scripts/run-tests.sh:1050
/builds/project/scheduler/web/core/scripts/run-tests.sh:189

* PHPUnit\Event\TestRunner\WarningTriggered: No tests found in class "Drupal\Tests\Composer\Generator\BuilderTest".
```

This means that a class imported by the test class via a `use` statement could not be found, and therefore the test was discarded from the discovered list. Likely an autoloading or symlinking issue.

```php
*PHPUnit\Event\Test\PhpunitErrorTriggered: The data provider specified for Drupal\Tests\address\Unit\Plugin\Validation\Constraint\CountryConstraintValidatorTest::testValidate is invalid
Data Provider method Drupal\Tests\address\Unit\Plugin\Validation\Constraint\CountryConstraintValidatorTest::providerTestValidate() is not static
/builds/project/scheduler/web/core/lib/Drupal/Core/Test/PhpUnitTestDiscovery.php:147
/builds/project/scheduler/web/core/scripts/run-tests.sh:1050
/builds/project/scheduler/web/core/scripts/run-tests.sh:189
```

This means that during test discovery, a data provider that was not specifying the `static` modifier was encountered. While this will be a big bold failure if we were in the test execution phase, during discovery it will just be discarded from the test list. The obvious fix here is to add the `static` identifier to the data provider method.

*Source: [run-tests.sh uses PHPUnit's API to determine the tests to run](https://www.drupal.org/node/3530388), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
