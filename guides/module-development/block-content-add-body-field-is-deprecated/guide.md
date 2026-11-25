---
name: block-content-add-body-field-is-deprecated
title: "block_content_add_body_field is deprecated"
description: "block_content_add_body_field is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3535528
change-record-nid: 3535528
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3535526](https://www.drupal.org/node/3535526)

The `block_content_add_body_field` method is now deprecated, there is no direct replacement.

If you need to create block content types in tests with a body field, use `Drupal\Tests\block_content\Traits\BlockContentCreationTrait::createBlockContentType` which will automatically add a body field or use `Drupal\Tests\field\Traits\BodyFieldCreationTrait`

*Source: [block_content_add_body_field is deprecated](https://www.drupal.org/node/3535528), a Drupal core change record by [smustgrave](https://www.drupal.org/user/3252890) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
