---
name: cache-metadata-for-computed-fields-is-now-bubbled-for-json
title: "Cache metadata for computed fields is now bubbled for JSON:API responses"
description: "Cache metadata for computed fields is now bubbled for JSON:API responses"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3570884
change-record-nid: 3570884
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3252278](https://www.drupal.org/node/3252278)

If a computed field value is returned via JSON:API, the computed field item list class can now implement `Drupal\Core\Cache\CacheableDependencyInterface` in order to have its cacheability metadata bubble to the response.

This was already fixed for rendered output in 10.2.4 (see [https://www.drupal.org/node/3423720](https://www.drupal.org/node/3423720)) and is now fixed for JSON:API.

As is noted in the other change notice, note that theoretically the added logic applies to the field item list classes of non-computed fields, as well, but it generally does not make sense to apply cacheable metadata to non-computed fields.

*Source: [Cache metadata for computed fields is now bubbled for JSON:API responses](https://www.drupal.org/node/3570884), a Drupal core change record by [tstoeckler](https://www.drupal.org/user/107158) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
