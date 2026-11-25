---
name: new-blockcontentcreationtrait-for-tests-interacting-with
title: "New BlockContentCreationTrait for tests interacting with block content entities"
description: "New BlockContentCreationTrait for tests interacting with block content entities"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3532512
change-record-nid: 3532512
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3046670](https://www.drupal.org/node/3046670)

A new trait `Drupal\Tests\block_content\Traits\BlockContentCreationTrait` has been added with the following methods: `createBlockContent` and `createBlockContentType`

These methods previously existed on the base class `\Drupal\Tests\block_content\Functional\BlockCotentTestBase`

Tests that create block content types and/or entities can now reuse these functions to reduce duplication.

*Source: [New BlockContentCreationTrait for tests interacting with block content entities](https://www.drupal.org/node/3532512), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
