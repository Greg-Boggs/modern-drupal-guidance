---
name: do-not-call-drupal-core-entity-entitytypebundleinfo
title: "Do not call \\Drupal\\Core\\Entity\\EntityTypeBundleInfo::getBundleInfo() with a NULL value"
description: "Do not call \\Drupal\\Core\\Entity\\EntityTypeBundleInfo::getBundleInfo() with a NULL value"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3557136
change-record-nid: 3557136
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3557135](https://www.drupal.org/node/3557135)

Calling `Drupal\Core\Entity\EntityTypeBundleInfo::getBundleInfo()` with a non-string entity type ID, such as NULL, is deprecated. In Drupal 12, an exception will be thrown.

It is recommended to change the calling code to avoid passing a non-string entity type ID.

*Source: [Do not call \Drupal\Core\Entity\EntityTypeBundleInfo::getBundleInfo() with a NULL value](https://www.drupal.org/node/3557136), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
