---
name: migration-plugins-link-options-link-uri-timezone-and-user
title: "Migration plugins link_options, link_uri, timezone, and user_langcode are moved to the Migrate module"
description: "Migration plugins link_options, link_uri, timezone, and user_langcode are moved to the Migrate module"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3572239
change-record-nid: 3572239
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3560075](https://www.drupal.org/node/3560075)

Four classes are deprecated in Drupal 11.4.0, to be removed in Drupal 13.0.0:

1. `Drupal\menu_link_content\Plugin\migrate\process\LinkOptions`
2. `Drupal\menu_link_content\Plugin\migrate\process\LinkUri`
3. `Drupal\system\Plugin\migrate\process\d6\Timezone`
4. `Drupal\user\Plugin\migrate\process\UserLangcode`

They are replaced by equivalent classes in the Migrate module:

1. `Drupal\migrate\Plugin\migrate\process\LinkOptions`
2. `Drupal\migrate\Plugin\migrate\process\LinkUri`
3. `Drupal\migrate\Plugin\migrate\process\Timezone`
4. `Drupal\migrate\Plugin\migrate\process\UserLangcode`

(The old `Timezone` class is in the `d6` namespace, but the new one is not.)

## Migrations

There is no change for migrations, since these process plugins are referenced by their plugin IDs, which have not changed:

1. `link_uri`
2. `link_options`
3. `timezone`
4. `user_langcode`

The plugin IDs now reference the new classes in the Migrate module.

## PHP Code

If you refer to these classes by their fully qualified class names, then you will have to update the namespace. This is most common in classes that extend the core plugin classes. For example, suppose you have a custom version of the `timezone` plugin. Then you will have to update the `use` statement in your module:

### Before Drupal 11.4.0

```php
namespace Drupal\mymodule\Plugin\migrate\process;

use Drupal\system\Plugin\migrate\process\d6\TimeZone;

/**
 * Custom variant of the timezone process plugin.
 */
#[MigrateProcess('my_timezone')]
class MyTimeZone extends TimeZone {
  // Your code goes here.
}
```

### In Drupal 11.4.0 or later

```php
namespace Drupal\mymodule\Plugin\migrate\process;

use Drupal\migrate\Plugin\migrate\process\TimeZone;

/**
 * Custom variant of the timezone process plugin.
 */
#[MigrateProcess('my_timezone')]
class MyTimeZone extends TimeZone {
  // Your code goes here.
}
```

*Source: [Migration plugins link_options, link_uri, timezone, and user_langcode are moved to the Migrate module](https://www.drupal.org/node/3572239), a Drupal core change record by [benjifisher](https://www.drupal.org/user/683300) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
