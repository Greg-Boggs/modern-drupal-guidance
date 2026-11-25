---
name: configmanager-findconfigentitydependenciesasentities
title: "ConfigManager::findConfigEntityDependenciesAsEntities() returns entities override free"
description: "ConfigManager::findConfigEntityDependenciesAsEntities() returns entities override free"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3582108
change-record-nid: 3582108
introduced-in-version: "11.4.x"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.x\
Issue links: [#3326900](https://www.drupal.org/node/3326900)

`ConfigManager::findConfigEntityDependenciesAsEntities()` now uses `loadMultipleOverrideFree()` instead of `loadMultiple()` when loading dependent config entities. This ensures that config entities returned by this method reflect their stored values rather than values modified by config overrides (e.g., $settings\['config'\] overrides or language overrides) and can be safely saved without causing overrides to overwrite the stored data.

*Source: [ConfigManager::findConfigEntityDependenciesAsEntities() returns entities override free](https://www.drupal.org/node/3582108), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
