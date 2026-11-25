---
name: unpublished-nodes-are-no-longer-hidden-on-content-overview
title: "Unpublished nodes are no longer hidden on Content overview page when a node access module is enabled"
description: "Unpublished nodes are no longer hidden on Content overview page when a node access module is enabled"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3455665
change-record-nid: 3455665
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3449181](https://www.drupal.org/node/3449181)

**Before**

The Content overview page (located at `/admin/content`) and any other Views that utilize the "Published status or admin user" filter would always display:

- Published nodes

- Unpublished nodes if a user:

- Is the author of the node and has the "View own unpublished content" permission, or

  Has the "Bypass content access control" permission, or

  Has the "View any unpublished content" permission

This behavior was consistent even when a node access module implementing `hook_node_grants()` was enabled on the site. This caused issues where unpublished nodes remained hidden in these views even when the node access module granted view access to them.

**After**

The Content overview page (located at `/admin/content`) and any other Views that utilize the "Published status or admin user" filter will now behave differently based on the presence of a node access module:

- If no node access module is enabled, the behavior remains unchanged.
- If a node access module is enabled then the "Published status or admin user" filter does not alter the query anymore. The node access module takes over the access control and responsible for granting access to published and unpublished nodes.

*Source: [Unpublished nodes are no longer hidden on Content overview page when a node access module is enabled](https://www.drupal.org/node/3455665), a Drupal core change record by [mxr576](https://www.drupal.org/user/315522) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
