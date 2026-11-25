---
name: rowpluginbase-render-only-accepts-drupal-views-resultrow
title: "RowPluginBase::render() only accepts \\Drupal\\views\\ResultRow"
description: "RowPluginBase::render() only accepts \\Drupal\\views\\ResultRow"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3309958
change-record-nid: 3309958
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3041170](https://www.drupal.org/node/3041170)

RowPluginBase::render() will no longer accept arguments other than instances of \Drupal\views\ResultRow.

This will be type-hinted in Drupal 12.0.

*Source: [RowPluginBase::render() only accepts \Drupal\views\ResultRow](https://www.drupal.org/node/3309958), a Drupal core change record by [smustgrave](https://www.drupal.org/user/3252890) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
