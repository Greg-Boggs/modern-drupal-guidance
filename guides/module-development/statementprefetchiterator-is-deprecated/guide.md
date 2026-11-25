---
name: statementprefetchiterator-is-deprecated
title: "StatementPrefetchIterator is deprecated"
description: "StatementPrefetchIterator is deprecated"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3575664
change-record-nid: 3575664
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3575547](https://www.drupal.org/node/3575547)

StatementPrefetchIterator was only extended by SQLite Statement, and is now deprecated. StatementBase more recently became the base class for StatementInterface, and now there's no benefit to have an intermediate class in the inheritance hierarchy.

*Source: [StatementPrefetchIterator is deprecated](https://www.drupal.org/node/3575664), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
