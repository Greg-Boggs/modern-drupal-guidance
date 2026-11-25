---
name: block-content-entity-reference-fields-now-use-the
title: "Block content entity reference fields now use the BlockContentSelection plugin by default"
description: "Block content entity reference fields now use the BlockContentSelection plugin by default"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3521459
change-record-nid: 3521459
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2987159](https://www.drupal.org/node/2987159)

A new EntityReferenceSelection plugin has been added for block_content entities. This automatically filters out non-reusable block_content entities.

This filtering was previously done by `BlockContentHooks::queryEntityReferenceAlter` to automatically add the condition on the reusable field if it didn't already exist.

This automatic addition of the reusable field is now deprecated. You can either:

1. Add the condition manually to your custom EntityReferenceSelection plugin.
2. Or, extend `\Drupal\block_content\Plugin\EntityReferenceSelection\BlockContentSelection` from your plugin.

*Source: [Block content entity reference fields now use the BlockContentSelection plugin by default](https://www.drupal.org/node/3521459), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
