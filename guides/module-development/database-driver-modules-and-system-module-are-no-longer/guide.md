---
name: database-driver-modules-and-system-module-are-no-longer
title: "Database driver modules and system module are no longer installed by drupal_install_system()"
description: "Database driver modules and system module are no longer installed by drupal_install_system()"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3615563
change-record-nid: 3615563
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3615455](https://www.drupal.org/node/3615455), [#3614153](https://www.drupal.org/node/3614153)

Drupal core's installation process previously installed datatabase driver modules and system module in `drupal_install_system()` prior to the installation of any other modules.

This has now been moved to `install_recipe_required_modules()` and `install_profile_modules()` where the database driver and system modules are installed alongside other modules instead.

Database drivers that override services will need to specify `container_rebuild_required: true` in `module.info.yml` so that any services that override schema creation and similar are replaced before any other modules are replaced.

Additionally, highly customized installers that call `drupal_install_system()` but replace `install_profile_modules` or `install_recipe_required_modules` will need to add the database driver to the list of modules to install.

*Source: [Database driver modules and system module are no longer installed by drupal_install_system()](https://www.drupal.org/node/3615563), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
