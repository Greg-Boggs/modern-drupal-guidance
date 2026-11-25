---
name: x-drupal-dynamic-cache-response-header-updated-for-4xx-and
title: "X-Drupal-Dynamic-Cache response header updated for 4xx and 5xx responses"
description: "X-Drupal-Dynamic-Cache response header updated for 4xx and 5xx responses"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3584640
change-record-nid: 3584640
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3451483](https://www.drupal.org/node/3451483)

Previously the value of the `X-Drupal-Dynamic-Cache` response header for 4xx and 5xx responses was misinforming developers: if the 4xx or 5xx response was generated early enough, the response would state `X-Drupal-Dynamic-Cache: UNCACHEABLE (poor cacheability)`, even though cacheability played no role. It was uncacheable because the response was generated so early.

This has now been fixed so that 4xx and 5xx responses always return `UNCACHEABLE (XXX)` as the value of the `X-Drupal-Dynamic-Cache` response header where `XXX` is the actual response status code (so in particular `UNCACHEABLE (403)` or `UNACHEABLE (404)`, for example).

For "regular" 4xx requests (i.e. for GET requests with HTML content type), Drupal internally performs a sub-request to return the (in the case of a 404, for example) "not found" page. In case that happens, the cache status of that sub-request is also returned as part of the value of the `X-Drupal-Dynamic-Cache` response header. The value is then `UNCACHEABLE (403, sub-request: MISS)` or `UNCACHEABLE (404, sub-request: HIT)`, for example.

*Source: [X-Drupal-Dynamic-Cache response header updated for 4xx and 5xx responses](https://www.drupal.org/node/3584640), a Drupal core change record by [tstoeckler](https://www.drupal.org/user/107158) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
