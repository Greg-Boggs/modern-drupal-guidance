---
name: commentiteminterface-constants-form-separate-page-and-form
title: "CommentItemInterface constants FORM_SEPARATE_PAGE and FORM_BELOW are deprecated"
description: "CommentItemInterface constants FORM_SEPARATE_PAGE and FORM_BELOW are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3550055
change-record-nid: 3550055
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3550054](https://www.drupal.org/node/3550054)

Constants for comment form display settings are deprecated. Use \Drupal\comment\FormLocation enum instead.

Before:

```php
CommentItemInterface::FORM_SEPARATE_PAGE
CommentItemInterface::FORM_BELOW
```

After:

```php
\Drupal\comment\FormLocation::SeparatePage
\Drupal\comment\FormLocation::Below
```

*Source: [CommentItemInterface constants FORM_SEPARATE_PAGE and FORM_BELOW are deprecated](https://www.drupal.org/node/3550055), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
