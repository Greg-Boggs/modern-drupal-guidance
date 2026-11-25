---
name: commenttestbase-setcommentpreview-now-takes-a
title: "CommentTestBase::setCommentPreview() now takes a CommentPreviewMode enum instead of an int for $mode"
description: "CommentTestBase::setCommentPreview() now takes a CommentPreviewMode enum instead of an int for $mode"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3538678
change-record-nid: 3538678
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3538660](https://www.drupal.org/node/3538660)

Instead of passing an integer for the `$mode` parameter to the `CommentTestBase::setCommentPreview()` method, use the new `Drupal\comment\CommentPreviewMode` enum.

#### Before

`$this->setCommentPreview(1);`

#### After

`$this->setCommentPreview(Drupal\comment\CommentPreviewMode::Optional);`

*Source: [CommentTestBase::setCommentPreview() now takes a CommentPreviewMode enum instead of an int for $mode](https://www.drupal.org/node/3538678), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
