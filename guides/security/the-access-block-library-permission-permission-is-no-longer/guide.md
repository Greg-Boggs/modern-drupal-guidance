---
name: the-access-block-library-permission-permission-is-no-longer
title: "The \"access block library permission\" permission is no longer required to create blocks"
description: "The \"access block library permission\" permission is no longer required to create blocks"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3455177
change-record-nid: 3455177
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3412420](https://www.drupal.org/node/3412420)

Previously, users needed the *Access the Content blocks overview page* (`access block library`) permission in order to create blocks (in addition to the *TYPE: Create new block content* or `create TYPE block content` permission).

However, there are cases where users should have access to create blocks, but not be able to access the block library. Therefore, the Block Content module has been changed so that users only need either the `create BUNDLE block content<code> <strong>or</strong> <code>administer block content` permission to create block content entities of that bundle type.

Following this change, `access block library` only controls whether users can view the list of content blocks at `admin/content/block` or over HTTP APIs.

Site owners should audit which roles have been granted both *Access the Content blocks overview page* and *TYPE: Create new block content* permissions to ensure they are correct:

- If *Access the Content blocks overview page* was granted to work around this bug, but the role actually only needs to create blocks and not access a full listing, the permission can now be revoked.
- If a role has *TYPE: Create new block content* but not *Access the Content blocks overview page*, they will be able to create blocks when they could not previously, so site owners should ensure that the block creation permission is granted intentionally.

*Source: [The "access block library permission" permission is no longer required to create blocks](https://www.drupal.org/node/3455177), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
