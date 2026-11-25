---
name: drupal-scaffold-composer-plugin-generates-a-new-drupal
title: "Drupal Scaffold composer plugin generates a new \\Drupal\\DrupalInstalled class"
description: "Drupal Scaffold composer plugin generates a new \\Drupal\\DrupalInstalled class"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3531162
change-record-nid: 3531162
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3509069](https://www.drupal.org/node/3509069)

The container cache key has been updated to use a hash of the all the versions of the packages installed by composer, including Drupal contrib, non-Drupal packages, and the root project package. The hash is written to the `\Drupal\DrupalInstalled` class during composer autoload dumping. The `DrupalInstalled.php` file is located in the vendor/drupal directory. The `\Drupal\DrupalInstalled::VERSIONS_HASH` constant can be used to construct any cache key that needs to change when code changes.

This also means that contrib and custom modules do not need to add empty update or post update hooks to force a container rebuild to load new services.

The drupal/core-composer-scaffold plugin is now a dependency of drupal/core. If you have disabled the plugin then you must add the following pre-autoload-dump script to your root composer.json

```php
    "scripts": {
        "pre-autoload-dump": "Drupal\\Composer\\Plugin\\Scaffold\\Plugin::preAutoloadDump"
    },
```

*Source: [Drupal Scaffold composer plugin generates a new \Drupal\DrupalInstalled class](https://www.drupal.org/node/3531162), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
