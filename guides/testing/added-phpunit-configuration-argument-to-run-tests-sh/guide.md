---
name: added-phpunit-configuration-argument-to-run-tests-sh
title: "Added --phpunit-configuration argument to run-tests.sh"
description: "Added --phpunit-configuration argument to run-tests.sh"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3536709
change-record-nid: 3536709
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3530113](https://www.drupal.org/node/3530113)

A new `--phpunit-configuration <path>` argument is added to the test runner script `run-tests.sh`

The `<path>` value is passed unabridged to PHPUnit's CLI `--configuration` argument when run-tests is spawning subprocesses involving running a PHPUnit command.

From [PHPUnit documentation](https://docs.phpunit.de/en/11.5/textui.html):

> `-c|--configuration <file>`
>
> Configure PHPUnit’s test runner using an XML configuration file. This is not required when the configuration file that is to be used is located in the current working directory and is named `phpunit.xml`, `phpunit.dist.xml`, or `phpunit.xml.dist`.

*Source: [Added --phpunit-configuration argument to run-tests.sh](https://www.drupal.org/node/3536709), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
