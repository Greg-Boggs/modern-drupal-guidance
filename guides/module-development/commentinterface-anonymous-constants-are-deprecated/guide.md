---
name: commentinterface-anonymous-constants-are-deprecated
title: "CommentInterface::ANONYMOUS_* constants are deprecated"
description: "CommentInterface::ANONYMOUS_* constants are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3547352
change-record-nid: 3547352
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3547349](https://www.drupal.org/node/3547349)

Constants for anonymous contact settings are deprecated. Use \Drupal\comment\AnonymousContact enum instead.

Before:\
`CommentItemInterface::ANONYMOUS_MAYNOT_CONTACT`\
`CommentItemInterface::ANONYMOUS_MAY_CONTACT`\
`CommentItemInterface::ANONYMOUS_MUST_CONTACT`

After:\
`\Drupal\comment\AnonymousContact::Forbidden`\
`\Drupal\comment\AnonymousContact::Allowed`\
`\Drupal\comment\AnonymousContact::Required`

*Source: [CommentInterface::ANONYMOUS\_\* constants are deprecated](https://www.drupal.org/node/3547352), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
