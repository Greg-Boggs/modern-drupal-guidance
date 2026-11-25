---
name: option-added-to-sectionstorage-attribute-to-make-inline
title: "Option added to SectionStorage attribute to make inline block creation optional"
description: "Option added to SectionStorage attribute to make inline block creation optional"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3485595
change-record-nid: 3485595
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3485435](https://www.drupal.org/node/3485435)

In [#2957425: Allow the inline creation of non-reusable Custom Blocks in the layout builder](https://www.drupal.org/project/drupal/issues/2957425) a link to create inline blocks in Layout Builder was introduced to allow editors adding new non-reusable inline blocks to layout builder sections.

However, that logic could not be disabled, so any module providing section storages was forced to have that link, or override the "Layout Builder Choose Block" controller.

In order to make it optional per section storage plugin, a new optional parameter in `SectionStorage` annotation/attribute has been introduced: `allow_inline_blocks`.

If TRUE, the `Create content block` link will be shown as part of the choose block off-canvas dialog. If FALSE, the link will be hidden and will not be possible to add new inline blocks from the Layout Builder UI. Its default value is TRUE to maintain BC compatibility.

*Source: [Option added to SectionStorage attribute to make inline block creation optional](https://www.drupal.org/node/3485595), a Drupal core change record by [plopesc](https://www.drupal.org/user/282415) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
