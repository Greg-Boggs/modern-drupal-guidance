---
name: the-base-class-implementation-of-insert-execute-is
title: "The base class implementation of Insert::execute() is deprecated"
description: "The base class implementation of Insert::execute() is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3612421
change-record-nid: 3612421
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3608493](https://www.drupal.org/node/3608493)

The base class implementation of `\Drupal\Core\Database\Query\Insert::execute()` was overriden in all core drivers, so it was carrying untested code.

It is now deprecated and in Drupal 12 the method and class will be rescoped to `abstract`.

Database drivers should provide their own implementation.

*Source: [The base class implementation of Insert::execute() is deprecated](https://www.drupal.org/node/3612421), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
