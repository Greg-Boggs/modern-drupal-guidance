---
name: media-getrequesttime-has-been-deprecated
title: "Media::getRequestTime() has been deprecated"
description: "Media::getRequestTime() has been deprecated"
drupal-core: ">=12.1"
source-url: https://www.drupal.org/node/3624921
change-record-nid: 3624921
introduced-in-version: "12.1.0"
introduced-in-branch: "12.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.1.x\
Introduced in version: 12.1.0\
Issue links: [#3568767](https://www.drupal.org/node/3568767)

`Media::getRequestTime()` has been deprecated in Drupal 12.1.0; it will be removed in Drupal 13.x.\
There is no replacement. [`CreatedItem::applyDefaultValue()`](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Field%21Plugin%21Field%21FieldType%21CreatedItem.php/function/CreatedItem%3A%3AapplyDefaultValue/main) already sets the default value for the field type to the to the request time; there is no need to set the field value to the request time. No contributed project should use `Media::getRequestTime()`.

*Source: [Media::getRequestTime() has been deprecated](https://www.drupal.org/node/3624921), a Drupal core change record by [avpaderno](https://www.drupal.org/user/55077) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
