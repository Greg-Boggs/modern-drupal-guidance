---
name: drupal-core-extension-extensiondiscovery-filecache-is
title: "\\Drupal\\Core\\Extension\\ExtensionDiscovery::$fileCache is deprecated"
description: "\\Drupal\\Core\\Extension\\ExtensionDiscovery::$fileCache is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3490431
change-record-nid: 3490431
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3490347](https://www.drupal.org/node/3490347)

If custom or contrib code extends `\Drupal\Core\Extension\ExtensionDiscovery` and uses the `\Drupal\Core\Extension\ExtensionDiscovery::$fileCache` property, it will need to change before 12.0.0 is released.

If the code is writing a new entry to the cache it will need to add the property to the class and instantiate the file cache object during construction as `\Drupal\Core\Extension\ExtensionDiscovery::$fileCache` will no longer be set by the parent class.

If the code uses the cache entry written by `\Drupal\Core\Extension\ExtensionDiscovery` then this is no longer present and you need to optimise the cache miss path. If you are reading an info.yml file you can use the \Drupal\Core\Extension\ExtensionDiscovery::$infoParser property if it is available.

*Source: [\Drupal\Core\Extension\ExtensionDiscovery::$fileCache is deprecated](https://www.drupal.org/node/3490431), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
