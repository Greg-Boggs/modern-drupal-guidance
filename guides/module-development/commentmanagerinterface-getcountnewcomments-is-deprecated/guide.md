---
name: commentmanagerinterface-getcountnewcomments-is-deprecated
title: "CommentManagerInterface::getCountNewComments is deprecated"
description: "CommentManagerInterface::getCountNewComments is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3551729
change-record-nid: 3551729
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3543035](https://www.drupal.org/node/3543035)

`\Drupal\comment\CommentManagerInterface::getCountNewComments()` is deprecated, use `\Drupal\history\HistoryManager::getCountNewComments()` instead.

The `comment-count-new` token has moved from the Comment to the History module. To use this token the History module must be installed.

*Source: [CommentManagerInterface::getCountNewComments is deprecated](https://www.drupal.org/node/3551729), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
