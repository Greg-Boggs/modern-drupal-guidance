---
name: drupal-disabled-drupal-optional-drupal-required-are
title: "DRUPAL_DISABLED, DRUPAL_OPTIONAL, DRUPAL_REQUIRED are deprecated"
description: "DRUPAL_DISABLED, DRUPAL_OPTIONAL, DRUPAL_REQUIRED are deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3448089
change-record-nid: 3448089
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3538662](https://www.drupal.org/node/3538662)

The constants `DRUPAL_DISABLED, DRUPAL_OPTIONAL, DRUPAL_REQUIRED` have been deprecated.

Use of these constants have been replaced with `enum` classes in the respective modules.

- `comment`
- `link`
- `node`

The new, equivalent enums have kept the same integer values.

See:

- `core/modules/comment/src/CommentPreview.php`
- `core/modules/link/src/LinkTitleVisibility.php`
- `core/modules/node/src/NodePreview.php`

Either use the appropriate new enum or create a custom enum.

*Source: [DRUPAL_DISABLED, DRUPAL_OPTIONAL, DRUPAL_REQUIRED are deprecated](https://www.drupal.org/node/3448089), a Drupal core change record by [diegoe](https://www.drupal.org/user/342819) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
