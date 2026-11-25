---
name: the-ui-for-updating-modules-and-themes-via-the-admin
title: "The UI for updating modules and themes via the admin interface has been removed"
description: "The UI for updating modules and themes via the admin interface has been removed"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3511861
change-record-nid: 3511861
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3502973](https://www.drupal.org/node/3502973)

The Update Manager UI, which allowed administrators to download and update modules and themes through the Drupal admin interface, has been removed from core. This includes the related UI components, forms, routes, and supporting code, while preserving the update status reporting functionality.

What is affected?

The following routes have been removed:

- `/admin/reports/updates/update` (`update.report_update`)
- `/admin/modules/update` (`update.module_update`)
- `/admin/appearance/update` (`update.theme_update`)
- `/admin/update/ready` (`update.confirmation_page`)

The following form classes have been removed:

- `\Drupal\update\Form\UpdateManagerUpdate`
- `\Drupal\update\Form\UpdateReady`

The following route subscriber has been removed:

`\Drupal\update\Routing\UpdateRouteSubscriber`

The following utility functions has been removed:

`_update_manager_access()` and `update_manager_download_batch_finished()`

Additionally, all UI text and help text references to the Update Manager functionality have been removed.

Note that the contributed [automatic updates](https://www.drupal.org/project/issues/automatic_updates) module provides similar functionality in a more up-to-date way.

*Source: [The UI for updating modules and themes via the admin interface has been removed](https://www.drupal.org/node/3511861), a Drupal core change record by [andypost](https://www.drupal.org/user/118908) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
