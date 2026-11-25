---
name: json-api-filter-constants-have-been-deprecated
title: "JSON:API filter constants have been deprecated"
description: "JSON:API filter constants have been deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3495601
change-record-nid: 3495601
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3495600](https://www.drupal.org/node/3495600)

The .module file of jsonapi only contains constants. By changing to class constants, we can actually remove the `.module` file in a future update. This requires changing any usage of the constants below to their class equivalent.

- `JSONAPI_FILTER_AMONG_ALL` has been deprecated. Use `\Drupal\jsonapi\JsonApiFilter::AMONG_ALL` instead.
- `JSONAPI_FILTER_AMONG_PUBLISHED` has been deprecated. Use `\Drupal\jsonapi\JsonApiFilter::AMONG_PUBLISHED` instead.
- `JSONAPI_FILTER_AMONG_ENABLED` has been deprecated. Use `\Drupal\jsonapi\JsonApiFilter::AMONG_ENABLED` instead.
- `JSONAPI_FILTER_AMONG_OWN` has been deprecated. Use `\Drupal\jsonapi\JsonApiFilter::AMONG_OWN` instead.

*Source: [JSON:API filter constants have been deprecated](https://www.drupal.org/node/3495601), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
