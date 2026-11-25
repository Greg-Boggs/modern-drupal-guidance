---
name: getpreviewmode-and-setpreviewmode-on-nodetypeinterface-now
title: "getPreviewMode() and setPreviewMode() on NodeTypeInterface now expect a NodePreviewMode enum"
description: "getPreviewMode() and setPreviewMode() on NodeTypeInterface now expect a NodePreviewMode enum"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3538666
change-record-nid: 3538666
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3538277](https://www.drupal.org/node/3538277)

`NodeTypeInterface::getPreviewMode` and `NodeTypeInterface::setPreviewMode` now interact with the `\Drupal\node\NodePreviewMode` enum instead of integer values.

A new deprecated parameter `$returnAsInt` has been added to `getPreviewMode` to maintain backwards compatibility. Passing FALSE to this will return the NodePreviewMode enum instead.

Passing an integer to `setPreviewMode` is now deprecated, use the NodePreviewMode enum instead.

*Source: [getPreviewMode() and setPreviewMode() on NodeTypeInterface now expect a NodePreviewMode enum](https://www.drupal.org/node/3538666), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
