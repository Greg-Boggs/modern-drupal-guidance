---
name: 404-responses-are-now-a-cacheablenotfoundhttpexception
title: "404 responses are now a CacheableNotFoundHttpException (Router::matchRequest() throws CacheableResourceNotFoundException)"
description: "404 responses are now a CacheableNotFoundHttpException (Router::matchRequest() throws CacheableResourceNotFoundException)"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3581985
change-record-nid: 3581985
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3580545](https://www.drupal.org/node/3580545)

`Router::matchRequest()` now throws a (newly introduced) `CacheableResourceNotFoundException` instead of a `ResourceNotFoundException` if no route can be found for a given request.

This will result in a `CacheableNotFoundHttpException` being returned for a 404. This does not change the *actual* caching because 404 responses are outside of the scope of Dynamic Page Cache and Page Cache already cached 404s previously, but it does result in additional cacheability headers being returned if the `http.response.debug_cacheability_headers` service parameter is enabled. The headers will generally be

| Name | Value |
| --- | --- |
| X-Drupal-Cache-Tags | 4xx-response http_response |
| X-Drupal-Cache-Contexts |   |
| X-Drupal-Cache-Max-Age | -1 (Permanent) |

This is preparing for [#2352009: Bubbling of elements' max-age to the page's headers and the page cache](https://www.drupal.org/project/drupal/issues/2352009), since that change would result in no longer caching 404 responses in page cache, combined with this change, there behavior in regards to those will remain unchanged.

*Source: [404 responses are now a CacheableNotFoundHttpException (Router::matchRequest() throws CacheableResourceNotFoundException)](https://www.drupal.org/node/3581985), a Drupal core change record by [tstoeckler](https://www.drupal.org/user/107158) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
