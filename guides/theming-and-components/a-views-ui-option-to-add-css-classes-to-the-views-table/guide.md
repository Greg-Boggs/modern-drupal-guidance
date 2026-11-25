---
name: a-views-ui-option-to-add-css-classes-to-the-views-table
title: "A views UI option to add CSS classes to the views table element when using table formatter"
description: "A views UI option to add CSS classes to the views table element when using table formatter"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3499943
change-record-nid: 3499943
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3045871](https://www.drupal.org/node/3045871)

A new UI configuration option has been added to the views table formatter style to allow CSS classes to be added to the views `<table>` element. This makes it easier for site builders and themers to style table variations such as row striping, bordered/borderless rows, etc. via the UI, and to specific tables outputted by views. This affects module developers who may have needed to use views style plugins to achieve the same thing.

The change involves an update to the database schema. If the option is not visible it may be necessary to run 'drush updb' to update the database with the schema change.

**UI:**\
![New CSS class input highlighted in table formatter settings UI ](https://www.drupal.org/files/3045871-after-highlighted.png)

*Source: [A views UI option to add CSS classes to the views table element when using table formatter](https://www.drupal.org/node/3499943), a Drupal core change record by [pcate](https://www.drupal.org/user/3513833) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
