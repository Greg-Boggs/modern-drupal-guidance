---
id: cr-node-grants-helper
title: Report a user's node access grants
kind: code
guides: [node-access-grants-has-been-deprecated, node-access-view-all-nodes-is-deprecated]
---

Create a module called `bench_grantinfo` in `web/modules/custom` and turn it on. For a site audit, provide `bench_grantinfo.reporter` with two methods: `grants($op, $account)` returns the node access grants (realm => grant IDs) the account gets for that operation, exactly as Drupal works them out when it filters content lists, and `canViewAll($account)` says whether the grants give the account view access to all content.
