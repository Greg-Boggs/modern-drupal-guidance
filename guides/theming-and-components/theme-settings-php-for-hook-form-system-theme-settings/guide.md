---
name: theme-settings-php-for-hook-form-system-theme-settings
title: "theme-settings.php for hook_form_system_theme_settings_alter() has been deprecated"
description: "theme-settings.php for hook_form_system_theme_settings_alter() has been deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3587273
change-record-nid: 3587273
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3580152](https://www.drupal.org/node/3580152)

Using theme-settings.php files to isolate the form_system_theme_settings_alter has been deprecated.

**Primary recommendation**\
Set minimum supported version of Drupal to 11.3.0\
Convert the hook_form_system_theme_settings_alter to the OOP version.

**Secondary recommendation**\
Use this only if you need to support 11.2 and lower in addition to 12.\
Move the hook to the .theme file and follow the standard theme BC process for theme conversions.

*Source: [theme-settings.php for hook_form_system_theme_settings_alter() has been deprecated](https://www.drupal.org/node/3587273), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
