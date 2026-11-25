---
name: commentiteminterface-constants-hidden-open-and-closed-are
title: "CommentItemInterface constants HIDDEN, OPEN and CLOSED are deprecated"
description: "CommentItemInterface constants HIDDEN, OPEN and CLOSED are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3547362
change-record-nid: 3547362
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3547353](https://www.drupal.org/node/3547353)

`CommentItemInterface` constants `HIDDEN`, `OPEN` and `CLOSED` are deprecated. Use enum `\Drupal\comment\CommentingStatus` instead.

Before:

```php
CommentItemInterface::HIDDEN
CommentItemInterface::OPEN
CommentItemInterface::CLOSED
```

After:

```php
\Drupal\comment\CommentingStatus::Hidden
\Drupal\comment\CommentingStatus::Open
\Drupal\comment\CommentingStatus::Closed
```

*Source: [CommentItemInterface constants HIDDEN, OPEN and CLOSED are deprecated](https://www.drupal.org/node/3547362), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
