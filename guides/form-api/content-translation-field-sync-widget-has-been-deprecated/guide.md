---
name: content-translation-field-sync-widget-has-been-deprecated
title: "content_translation_field_sync_widget has been deprecated"
description: "content_translation_field_sync_widget has been deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3548573
change-record-nid: 3548573
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3548571](https://www.drupal.org/node/3548571)

`content_translation_field_sync_widget` has been deprecated.

`Use Drupal\content_translation\FieldSyncWidget::widget()` instead.

`core/modules/content_translation/content_translation.admin.inc` has been deprecated as well, all functions have been moved to the corresponding hook except `content_translation_field_sync_widget` which has the new service: `FieldSyncWidget`.

*Source: [content_translation_field_sync_widget has been deprecated](https://www.drupal.org/node/3548573), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
