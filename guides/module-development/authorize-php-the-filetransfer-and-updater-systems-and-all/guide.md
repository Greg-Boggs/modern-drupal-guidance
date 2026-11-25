---
name: authorize-php-the-filetransfer-and-updater-systems-and-all
title: "authorize.php, the FileTransfer and Updater systems, and all related code is deprecated"
description: "authorize.php, the FileTransfer and Updater systems, and all related code is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3512364
change-record-nid: 3512364
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3502974](https://www.drupal.org/node/3502974)

The update.module included in Drupal core used to provide a mechanism to update contributed extensions (modules and themes) directly via the web admin user interface. This system did not use `composer`, so any extension with external dependencies would not be correctly updated. The UI for this has been removed in Drupal 11.2.0 (see [The UI for updating modules and themes via the admin interface has been removed](https://www.drupal.org/node/3511861)), in favor of [using composer](https://www.drupal.org/docs/develop/using-composer) or the forthcoming "Automatic Updates" feature (currently the [Automatic Updates](https://www.drupal.org/project/automatic_updates) contributed module, hopefully soon to be included in Drupal Core as the new "Update Manager").

As a result, all of these methods and classes are now deprecated:

1. `core/authorize.php`
2. `system_authorized_init()`
3. `system_authorized_get_url()`
4. `system_authorized_batch_processing_url()`
5. `system_authorized_run()`
6. `system_authorized_batch_process()`
7. `core/lib/Drupal/Core/FileTransfer/*`
8. `core/lib/Drupal/Core/Updater/*`
9. `drupal_get_filetransfer_info()`
10. `hook_filetransfer_info()`
11. `hook_filetransfer_info_alter()`
12. `drupal_get_updaters()`
13. `hook_updater_info()`
14. `hook_updater_info_alter()`
15. `hook_verify_update_archive()`
16. Every method in `core/modules/update/update.authorize.inc`
17. Every method in `core/modules/update/update.manager.inc`

All of this code will be removed from Drupal 12.0.0. There is no direct replacement. An entirely new system will be provided once "Automatic updates" is merged into Drupal Core.

See also [Additional 'Update Manager' deprecations](https://www.drupal.org/node/3522119).

*Source: [authorize.php, the FileTransfer and Updater systems, and all related code is deprecated](https://www.drupal.org/node/3512364), a Drupal core change record by [dww](https://www.drupal.org/user/46549) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
