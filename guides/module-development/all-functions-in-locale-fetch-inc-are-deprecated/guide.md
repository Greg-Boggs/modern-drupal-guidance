---
name: all-functions-in-locale-fetch-inc-are-deprecated
title: "All functions in locale.fetch.inc are deprecated"
description: "All functions in locale.fetch.inc are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3572345
change-record-nid: 3572345
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3572339](https://www.drupal.org/node/3572339)

All functions in locale.fetch.inc are deprecated and moved to the `LocaleFetch` service class.

`locale_translation_batch_update_build` is replaced by `\Drupal::service(LocaleFetch::class)->buildUpdateBatch($projects, $langcodes, $options)`

`locale_translation_batch_fetch_build` is replaced by `\Drupal::service(LocaleFetch::class)->buildFetchBatch($projects, $langcodes, $options)`

`_locale_translation_fetch_operations` -> There is no replacement.

**Important note:** Before 11.4 was released the method names were changed: [https://www.drupal.org/node/3589759](https://www.drupal.org/node/3589759)

*Source: [All functions in locale.fetch.inc are deprecated](https://www.drupal.org/node/3572345), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
