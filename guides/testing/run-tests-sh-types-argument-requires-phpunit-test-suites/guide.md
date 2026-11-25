---
name: run-tests-sh-types-argument-requires-phpunit-test-suites
title: "run-tests.sh --types argument requires PHPUnit test suites names"
description: "run-tests.sh --types argument requires PHPUnit test suites names"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3581591
change-record-nid: 3581591
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3581399](https://www.drupal.org/node/3581399)

PHPUnit tests are grouped in 'test suites'. The definition of the test suites is contained in the `phpunit.xml.dist` configuration file - for each test suite a set of directories are defined; the files identified as tests in those directories are associated to the defined suite.

For historical reasons, the naming of the test suites defined in Drupal's PHPUnit configuration file was not matching the naming used by Drupal's test runner run-tests.sh in its `--types` command line argument.

Now the `--types` command line argument allowed input requires the name of the test suites as defined in PHPUnit's configuration file.

The value accepted so far should be replaced as follows:

```php
    'PHPUnit-FunctionalJavascript' => 'functional-javascript',
    'PHPUnit-Functional' => 'functional',
    'PHPUnit-Kernel' => 'kernel',
    'PHPUnit-Unit' => 'unit',
    'PHPUnit-Unit-Component' => 'unit-component',
    'PHPUnit-Build' => 'build',
```

## EXAMPLE

### Before

`sudo -u www-data -E -H php ./core/scripts/run-tests.sh [...] --types "PHPUnit-Unit,PHPUnit-Kernel" [...] --all`

### After

`sudo -u www-data -E -H php ./core/scripts/run-tests.sh [...] --types "unit,kernel" [...] --all`

*Source: [run-tests.sh --types argument requires PHPUnit test suites names](https://www.drupal.org/node/3581591), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
