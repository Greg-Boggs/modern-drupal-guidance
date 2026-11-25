---
name: statementbase-abstract-class-introduced
title: "StatementBase abstract class introduced"
description: "StatementBase abstract class introduced"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3510455
change-record-nid: 3510455
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3488467](https://www.drupal.org/node/3488467)

There is quite some duplicated or nearly duplicated code in `StatementWrapperIterator` and `StatementPrefetchIterator`.

A new abstract `StatementBase` class is introduced, parent to both `StatementWrapperIterator` and `StatementPrefetchIterator` classes. The new class generalizes most of the methods so that the child classes do not have to implement them anymore. Also, helper classes to manage results of execution statements are introduced, to cover both PDO and prefetched results. This will make simpler to develop contrib/custom Statement objects.

No public methods were deprecated and no APIs are impacted because of this.

*Source: [StatementBase abstract class introduced](https://www.drupal.org/node/3510455), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
