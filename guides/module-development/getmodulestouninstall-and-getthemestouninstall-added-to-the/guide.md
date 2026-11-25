---
name: getmodulestouninstall-and-getthemestouninstall-added-to-the
title: "getModulesToUninstall() and getThemesToUninstall() added to the installer interfaces"
description: "getModulesToUninstall() and getThemesToUninstall() added to the installer interfaces"
drupal-core: ">=12.1"
source-url: https://www.drupal.org/node/3627280
change-record-nid: 3627280
introduced-in-version: "12.1.0"
introduced-in-branch: "12.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.1.x\
Introduced in version: 12.1.0\
Issue links: [#3594335](https://www.drupal.org/node/3594335)

Two new methods were added to existing interfaces in core.\
Both of these methods were added under the 1:1 rule according to [Drupal's backwards compatibility policy](https://www.drupal.org/about/core/policies/core-change-policies/bc-policy#Interfaces-non-test)

- `ModuleInstallerInterface::getModulesToUninstall(array $module_list, bool $uninstall_dependents = TRUE)`
- `ThemeInstallerInterface::getThemesToUninstall(array $theme_list, bool $uninstall_dependents = TRUE)`

Each returns the machine names of the extensions that need to be uninstalled.

The concrete implementation of these methods in the `ModuleInstaller` and `ThemeInstaller` contains logic previously internal to the `::uninstall` method on both interface.

*Source: [getModulesToUninstall() and getThemesToUninstall() added to the installer interfaces](https://www.drupal.org/node/3627280), a Drupal core change record by [kristiantosney](https://www.drupal.org/user/3538880) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
