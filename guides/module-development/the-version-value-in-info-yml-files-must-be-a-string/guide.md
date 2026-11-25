---
name: the-version-value-in-info-yml-files-must-be-a-string
title: "The 'version' value in .info.yml files must be a string"
description: "The 'version' value in .info.yml files must be a string"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3576311
change-record-nid: 3576311
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3565033](https://www.drupal.org/node/3565033)

The `version` value in `.info.yml` files must be a string. Previously, using numeric literals was possible, but this can lead to all sorts of problems. For example, the version `1.0` would be parsed as a number, and simplified to just `1`. To ensure consistency, the version value must now explicitly be a string wrapped in single quotes.

Note that extension developers distributing code on Drupal.org do not need to worry about this. The Drupal.org packaging system automatically adds the `version` key to `.info.yml` files, and has always done so as a string literal. This change primarily impacts the `.info.yml` files for custom extensions.

### Before

An `custom_example.info.yml` file might look like this:

```php
core_version_requirement: '^10 || ^11'
name: 'Custom example'
type: module
version: 1.1
```

### After

Now, you must wrap the `version` value in quotes:

```php
core_version_requirement: '^10 || ^11'
name: 'Custom example'
type: module
version: '1.1'
```

*Source: [The 'version' value in .info.yml files must be a string](https://www.drupal.org/node/3576311), a Drupal core change record by [dww](https://www.drupal.org/user/46549) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
