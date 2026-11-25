---
name: new-exception-status-code-cache-context
title: "New Exception status code cache context"
description: "New Exception status code cache context"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3580452
change-record-nid: 3580452
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3516173](https://www.drupal.org/node/3516173)

Drupal core includes a block visibility condition to control whether blocks are shown on 404 or 403 pages or not.

This visibility condition added the `url.path` cache context, which lead to low cache hit rates for the block render cache on 404 and 403 pages.

A new `exception_status_code` cache context has been added, which returns the status code when there is an exception, or the string `'0'` when there is no request exception. This is used in the block condition.

*Source: [New Exception status code cache context](https://www.drupal.org/node/3580452), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
