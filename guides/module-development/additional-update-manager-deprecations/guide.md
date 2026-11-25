---
name: additional-update-manager-deprecations
title: "Additional 'Update Manager' deprecations"
description: "Additional 'Update Manager' deprecations"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3522119
change-record-nid: 3522119
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3521059](https://www.drupal.org/node/3521059)

In addition to the changes described at [authorize.php, the FileTransfer and Updater systems, and all related code is deprecated](https://www.drupal.org/node/3512364), additional services, functions and a theme template are deprecated:

1. The `update.root` service and `core/modules/update/src/UpdateRoot.php`
2. `_update_manager_cache_directory()`
3. `_update_manager_extract_directory()`
4. `_update_manager_unique_identifier()`
5. `update_clear_update_disk_cache()`
6. `update_delete_file_if_stale()`
7. The `authorize-report` theme template, `authorize-report.html.twig` (from both system and stable9 theme), and `template_preprocess_authorize_report()`

There is no replacement. [Use composer to manage the code for Drupal sites](https://www.drupal.org/docs/develop/using-composer).

`update_clear_update_disk_cache()` used to be called via `hook_cron()`, but that is no longer the case. Sites that haven't used the Update Manager should not have any files in this cache. A post update method is provided, `update_post_update_clear_disk_cache()`, to remove directories named "`update-cache-*`" and "`update-extraction-*`" (and all of their contents) in the site's temporary directory on disk.

*Source: [Additional 'Update Manager' deprecations](https://www.drupal.org/node/3522119), a Drupal core change record by [dww](https://www.drupal.org/user/46549) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
