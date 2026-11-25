---
name: install-profiles-can-opt-out-of-being-installed
title: "Install profiles can opt out of being installed"
description: "Install profiles can opt out of being installed"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3615565
change-record-nid: 3615565
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3614401](https://www.drupal.org/node/3614401)

Some install profiles do not need to implement any hooks or services, and instead only contain a list of modules and configuration to install.

These profiles can now opt out of being installed during the installer by setting `opt_out_install: true`.

This key works differently to `keep_profile: false` which installs the install profile during the installer but uninstalls it at the end, and can still be used where the install profile implements customizations to the installation process itself.

*Source: [Install profiles can opt out of being installed](https://www.drupal.org/node/3615565), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
