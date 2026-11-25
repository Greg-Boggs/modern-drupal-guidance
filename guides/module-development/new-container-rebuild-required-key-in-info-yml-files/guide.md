---
name: new-container-rebuild-required-key-in-info-yml-files
title: "New container_rebuild_required key in .info.yml files"
description: "New container_rebuild_required key in .info.yml files"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3473563
change-record-nid: 3473563
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3416522](https://www.drupal.org/node/3416522), [#3492235](https://www.drupal.org/node/3492235), [#3492705](https://www.drupal.org/node/3492705)

Multiple modules can now be installed without a container rebuild in between each one. This is a significant performance improvement when installing a new Drupal site locally or on CI environments.

Since some modules modify the container so that any changes they make need to happen immediately or depend on a module that does so, a new `container_rebuild_required` key has been added to .info.yml files. When this key is set to TRUE, a container rebuild will be triggered immediately before and after installing the module. If a module does not require a container rebuild immediately after installation, it can be set to FALSE or left unset to improve performance.

In general, you can safely set this to FALSE or leave it unset unless you are decorating or otherwise modifying services that are used within the module install process itself or requiring a dependency that does so.

**Breaking change**\
Modules can no longer rely on optional config in their `hook_install()` for modules they depend on. Move the config-dependant logic from `hook_install()` to `hook_modules_installed()`.

*Source: [New container_rebuild_required key in .info.yml files](https://www.drupal.org/node/3473563), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
