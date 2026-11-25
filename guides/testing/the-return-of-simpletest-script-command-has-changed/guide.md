---
name: the-return-of-simpletest-script-command-has-changed
title: "The return of \\simpletest_script_command() has changed"
description: "The return of \\simpletest_script_command() has changed"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3483336
change-record-nid: 3483336
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3476011](https://www.drupal.org/node/3476011)

`\simpletest_script_command()` is a function in `run-tests.sh` used to parse the command line arguments to `run-tests.sh`.

The code is considered internal.

The return has changed from a parsed string to an array of command components.

The return can now be used with `symfony/process`

*Source: [The return of \simpletest_script_command() has changed](https://www.drupal.org/node/3483336), a Drupal core change record by [larowlan](https://www.drupal.org/user/395439) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
