---
name: change-drupal-core-config-configinstaller-to-support
title: "Change \\Drupal\\Core\\Config\\ConfigInstaller to support installing multiple modules with a single container rebuild"
description: "Change \\Drupal\\Core\\Config\\ConfigInstaller to support installing multiple modules with a single container rebuild"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3492559
change-record-nid: 3492559
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3416522](https://www.drupal.org/node/3416522)

Code that has extended `\Drupal\Core\Config\ConfigInstaller` or implemented `\Drupal\Core\Config\ConfigInstallerInterface` will need to change in order to support Drupal 11.2. Code that calls the methods is unlikely to need to change unless it wants to use the new functionality detailed below.

A `$mode` argument is added to `\Drupal\Core\Config\ConfigInstaller::installDefaultConfig()`. This enables installing configuration in a modules config/install, config/optional, and other installed modules config/optional directories in separate operations. A new enum `\Drupal\Core\Config\DefaultConfigMode` is added to support this.

A `$previously_checked_config` argument is added to the protected methods `\Drupal\Core\Config\ConfigInstaller::findPreExistingConfiguration()` and `\Drupal\Core\Config\ConfigInstaller::findDefaultConfigWithUnmetDependencies()`. This argument is a list of previously checked configuration, keyed by collection name.

See [#3492937: Add compatibility layer for Drupal 11.2](https://www.drupal.org/project/config_selector/issues/3492937) for an example of how to add a compatibility layer to a module that decorates the config installer.

*Source: [Change \Drupal\Core\Config\ConfigInstaller to support installing multiple modules with a single container rebuild](https://www.drupal.org/node/3492559), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
