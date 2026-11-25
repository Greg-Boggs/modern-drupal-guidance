---
name: the-vendor-hardening-plugin-can-be-configured-to-skip
title: "The vendor hardening plugin can be configured to skip cleaning certain packages"
description: "The vendor hardening plugin can be configured to skip cleaning certain packages"
drupal-core: ">=11.2.3"
source-url: https://www.drupal.org/node/3536166
change-record-nid: 3536166
introduced-in-version: "11.2.3"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.3\
Issue links: [#3534278](https://www.drupal.org/node/3534278)

Previously, the `drupal/core-vendor-hardening` Composer plugin could be configured to clean *additional* packages beyond the ones it knew about by default, but could not be configured to *skip* cleaning particular packages.

You can now do that by setting this configuration in your project's composer.json (in this example, we're telling the plugin to not clean `composer/composer`):

```php
"extra": {
  "drupal-core-vendor-hardening": {
    "composer/composer": false
  }
}
```

Or, at the command line:

`composer config extra.drupal-core-vendor-hardening --merge --json '{"composer/composer": false}'`

With this configuration, when `composer/composer` is installed, it will be left unchanged and all of its files will be in the vendor directory. Therefore, you should use this option with care and only if you know exactly what you're doing, as extra files in the vendor directory can pose a potential security risk in some circumstances.

*Source: [The vendor hardening plugin can be configured to skip cleaning certain packages](https://www.drupal.org/node/3536166), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
