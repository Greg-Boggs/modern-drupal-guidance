---
name: install-profiles-can-opt-into-being-automatically
title: "Install profiles can opt into being automatically uninstalled"
description: "Install profiles can opt into being automatically uninstalled"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3605597
change-record-nid: 3605597
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3605551](https://www.drupal.org/node/3605551)

Since Drupal 10.3, it's been possible to uninstall an install profile, just like any module:

```php
Drupal::service('module_installer')->uninstall(['my_profile']);
```

This works as long as the profile does not physically contain any installed modules or themes (e.g. `profiles/foo/modules/my_special_module`). If it does, an exception is thrown.

Install profiles can now opt into being *automatically* uninstalled by the install system, by adding this to the info file:

```php
keep_profile: false
```

Profiles that do not set this flag will remain installed, same as they do now. And, as now, an exception is thrown if the profile being uninstalled contains any active modules or themes.

This is ideal for profiles which do not contain any special modules or themes, but which only want to customize the install experience (adding additional steps, using a different installer theme, etc.).

*Source: [Install profiles can opt into being automatically uninstalled](https://www.drupal.org/node/3605597), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
