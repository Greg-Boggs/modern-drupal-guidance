---
name: getmodulestoinstall-and-getthemestoinstall-added-to-the
title: "getModulesToInstall() and getThemesToInstall() added to the installer interfaces"
description: "getModulesToInstall() and getThemesToInstall() added to the installer interfaces"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3623057
change-record-nid: 3623057
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3594334](https://www.drupal.org/node/3594334)

Two methods have been added so that callers can find out what an install would install prior to installing it. Class implementations for these methods must now implement the new method. There is no change necessary for code that extends the core installer classes.

- `\Drupal\Core\Extension\ModuleInstallerInterface::getModulesToInstall(array $module_list, bool $enable_dependencies = TRUE): array`
- `\Drupal\Core\Extension\ThemeInstallerInterface::getThemesToInstall(array $theme_list, bool $install_dependencies = TRUE): array`

Each returns the machine names of the extensions that are not yet installed, including resolved dependencies, in the order to install them. Already installed extensions are omitted. `ModuleInstaller::install()` and `ThemeInstaller::install()` now delegate to these methods.

The Drupal CLI `ex:install` command and Module Administration form use this to list exactly what will be installed, including dependencies.

#### Example

```php
  /** @var \Drupal\Core\Extension\ModuleInstaller $installer */
  $installer = \Drupal::service('module_installer');

  // Returns an indexed array in order of dependency resolution: autowire_test, console_test.
  $modules = $installer->getModulesToInstall(['console_test']);

  // Installs autowire_test and then console_test.
  $installer->install($modules);
```

*Source: [getModulesToInstall() and getThemesToInstall() added to the installer interfaces](https://www.drupal.org/node/3623057), a Drupal core change record by [mradcliffe](https://www.drupal.org/user/157079) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
