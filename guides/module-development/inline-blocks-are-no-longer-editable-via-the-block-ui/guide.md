---
name: inline-blocks-are-no-longer-editable-via-the-block-ui
title: "Inline blocks are no longer editable via the block UI"
description: "Inline blocks are no longer editable via the block UI"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3527795
change-record-nid: 3527795
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3075308](https://www.drupal.org/node/3075308)

Inline blocks can no longer be edited or deleted via the normal block content UI routes at `/admin/content/block/ID` and `/admin/content/block/ID/delete`.

Managing block content entities via this method can break the block in context of the Layout it is attached to. Inline blocks should only ever be managed via the Layout page of the entity it is attached to.

*Source: [Inline blocks are no longer editable via the block UI](https://www.drupal.org/node/3527795), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
