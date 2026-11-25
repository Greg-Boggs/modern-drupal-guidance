---
name: performancedata-getcachetagchecksumcount-and
title: "PerformanceData getCacheTagChecksumCount and getCacheTagIsValidCount deprecated"
description: "PerformanceData getCacheTagChecksumCount and getCacheTagIsValidCount deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3511149
change-record-nid: 3511149
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3511123](https://www.drupal.org/node/3511123)

`PerformanceData::getCacheTagChecksumCount()` and `PerformanceData::getCacheTagIsValidCount()` have both been deprecated.

There is no direct replacement, however the `getCacheTagGroupedLookups()` and `getCacheTagLookupQueryCount()` provide a more realistic reflection of how cache tag lookups impact a page and may be used instead.

*Source: [PerformanceData getCacheTagChecksumCount and getCacheTagIsValidCount deprecated](https://www.drupal.org/node/3511149), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
