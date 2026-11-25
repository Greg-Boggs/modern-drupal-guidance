---
name: statementprefetchiterator-fetchcolumn-is-deprecated
title: "StatementPrefetchIterator::fetchColumn is deprecated."
description: "StatementPrefetchIterator::fetchColumn is deprecated."
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3490312
change-record-nid: 3490312
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3490200](https://www.drupal.org/node/3490200)

The `StatementPrefetchIterator::fetchColumn()` method is a leftover of earlier times when `StatementPrefetchIterator` was directly extending `\PDOStatement`, is called nowhere in core, and has no interface definition nor correspondence in `StatementWrapperIterator`.

The method is now deprecated.

Use `StatementPrefetchIterator::fetchField()` instead, which is API and working actually the same.

In core, `StatementPrefetchIterator` is only used by the database driver for SQLite.

*Source: [StatementPrefetchIterator::fetchColumn is deprecated.](https://www.drupal.org/node/3490312), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
