---
name: added-new-debugdump-extension-for-phpunit
title: "Added new DebugDump extension for PHPUnit"
description: "Added new DebugDump extension for PHPUnit"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3468251
change-record-nid: 3468251
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3436029](https://www.drupal.org/node/3436029)

A `DebugDump` PHPUnit extension is introduced to capture the output of dump() during the tests, and print it cumulatively at the end of the testrunner execution. This also adds information about where each dump() call happened.

The previous approach to print the outcome of dump() while running the test no longer holds in PHPUnit 10 'run in isolation' tests (which are the totality of the Kernel and Functional test). There were already changes in PHPUnit 9 that forced the change to printing to STDERR instead of STDOUT, but later issues were reported with that approach.

Test code and SUT code share the same standard streams. PHPUnit is 'sealing' more and more the SUT to prevent confusion between SUT and test output.

In order to activate the extension, add the following to your `phpunit.xml` file:

```php
  <extensions>
    .... 
    <!-- Debug dump() printer. -->
    <bootstrap class="Drupal\TestTools\Extension\Dump\DebugDump">
      <parameter name="colors" value="true"/>
      <parameter name="printCaller" value="true"/>
    </bootstrap>
  </extensions>
```

The extension has two parameters:

- *colors* - indicating whether the output should use ANSI colors.
- *printCaller* - indicating whether the dump output should include the file path and the line from where it was invoked.

*Source: [Added new DebugDump extension for PHPUnit](https://www.drupal.org/node/3468251), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
