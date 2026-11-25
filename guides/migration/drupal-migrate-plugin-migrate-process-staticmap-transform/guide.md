---
name: drupal-migrate-plugin-migrate-process-staticmap-transform
title: "\\Drupal\\migrate\\Plugin\\migrate\\process\\StaticMap::transform() cannot map NULL values unless there is a default value or bypass is set"
description: "\\Drupal\\migrate\\Plugin\\migrate\\process\\StaticMap::transform() cannot map NULL values unless there is a default value or bypass is set"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3557003
change-record-nid: 3557003
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3458923](https://www.drupal.org/node/3458923)

Currently the static map plugin will map NULL to values using an empty string array key. For example the following StaticMap configuration

```php
map:
  '': 'Mapped null value'
  this: that
```

will map NULL values to `'Mapped null value'`. This will trigger a deprecation in Drupal 11.3.0. To avoid the deprecation the migration can either use the `default_value` or `bypass` setting. Setting `bypass` to TRUE will return NULLs for NULL values. Setting a `default_value` will return the default value for NULL values.

*Source: [\Drupal\migrate\Plugin\migrate\process\StaticMap::transform() cannot map NULL values unless there is a default value or bypass is set](https://www.drupal.org/node/3557003), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
