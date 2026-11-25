---
name: node-mark-is-deprecated
title: "node_mark() is deprecated"
description: "node_mark() is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3514189
change-record-nid: 3514189
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3223211](https://www.drupal.org/node/3223211)

The `node_mark()` function was only used on non-views Node listing pages via NodeListBuilder. This coupled the node module with the history module. The history module implements its own HistoryUserTimestamp views field with the same functionality.

There is no replacement, marks have been removed from the default node listing.

*Source: [node_mark() is deprecated](https://www.drupal.org/node/3514189), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
