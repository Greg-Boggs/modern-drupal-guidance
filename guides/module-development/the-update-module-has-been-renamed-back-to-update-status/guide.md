---
name: the-update-module-has-been-renamed-back-to-update-status
title: "The update.module has been renamed back to 'Update Status'"
description: "The update.module has been renamed back to 'Update Status'"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3521054
change-record-nid: 3521054
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3483501](https://www.drupal.org/node/3483501), [#3253158](https://www.drupal.org/node/3253158)

The update.module included in Drupal Core used to be called the "Update Manager". However, the "manager" aspects of it did not work with composer managed sites, which is now a requirement. After all of these issues, the update.module no longer "manages" any updates:

- [#3417136: Remove adding an extension via a URL](https://www.drupal.org/project/drupal/issues/3417136)

- [#3491731: \[META\] Remove the ability to update modules and themes via authorize.php](https://www.drupal.org/project/drupal/issues/3491731)

  - [#3502973: Remove UI and routes for the ability to update modules and themes via update.module and authorize.php](https://www.drupal.org/project/drupal/issues/3502973)
  - [#3502974: Deprecate authorize.php, the FileTransfer and Updater systems](https://www.drupal.org/project/drupal/issues/3502974)

It is informational only, providing the **Available Updates** status report. Therefore, the human readable name has been changed back to "Update Status", to make way for a new and improved "Update Manager" via [#3253158: Add Alpha level Experimental Update Manager module](https://www.drupal.org/project/drupal/issues/3253158).

*Source: [The update.module has been renamed back to 'Update Status'](https://www.drupal.org/node/3521054), a Drupal core change record by [dww](https://www.drupal.org/user/46549) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
