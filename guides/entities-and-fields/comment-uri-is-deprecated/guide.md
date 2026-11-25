---
name: comment-uri-is-deprecated
title: "comment_uri() is deprecated"
description: "comment_uri() is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3384294
change-record-nid: 3384294
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2010202](https://www.drupal.org/node/2010202)

The function `comment_uri()` is deprecated use `\Drupal\comment\Entity\Comment::permalink()` or `Comment::toUrl()` with `fragment` option instead.

*Source: [comment_uri() is deprecated](https://www.drupal.org/node/3384294), a Drupal core change record by [andypost](https://www.drupal.org/user/118908) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
