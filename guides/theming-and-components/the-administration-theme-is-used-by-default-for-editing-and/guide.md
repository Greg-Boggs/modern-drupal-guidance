---
name: the-administration-theme-is-used-by-default-for-editing-and
title: "The administration theme is used by default for editing and creating Node content"
description: "The administration theme is used by default for editing and creating Node content"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3514929
change-record-nid: 3514929
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3347015](https://www.drupal.org/node/3347015)

The default Node create and edit forms now use the administration theme.

#### Before

The setting `use_admin_theme` in `node.settings` defaulted to `false`. This meant that by default Node create and edit forms used the front-end theme.

#### After

The setting `use_admin_theme` in `node.settings` defaulted to `true`. This means that by default Node create and edit forms use the administration theme.

*Source: [The administration theme is used by default for editing and creating Node content](https://www.drupal.org/node/3514929), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
