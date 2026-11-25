---
name: theme-get-setting-is-deprecated
title: "theme_get_setting() is deprecated"
description: "theme_get_setting() is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3035289
change-record-nid: 3035289
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3035288](https://www.drupal.org/node/3035288)

The `theme_get_setting()` method is deprecated. It has been replaced by a new `Drupal\Core\Extension\ThemeSettingsProvider` service.

## Before

```php
// Get a setting from 'bartik' theme.
$logo = theme_get_setting('logo.url', 'bartik');

// Clear the 'bartik' theme settings static cache.
$theme_settings = &drupal_static('theme_get_setting');
unset($theme_settings[$theme_name]);

// Clear the theme settings static cache for all themes.
drupal_static_reset('theme_get_setting');
```

## After

```php
// It's recommended to inject the service where possible. 
$themeSettingsProvider = \Drupal::service('Drupal\Core\Extension\ThemeSettingsProvider');

// Get a setting from 'bartik' theme.
$logo = $themeSettingsProvider->getSetting('logo.url', 'bartik');

// Clear the 'bartik' theme settings static cache.
\Drupal::service('cache.memory')->delete('theme_settings:bartik');

// Clear the theme settings static cache for all themes.
\Drupal::service('cache_tags.invalidator')->invalidateTags(['config:system.theme.global']);
```

Additionally, not passing the `$themeSettingsProvider` service to the `Drupal\Core\Render\BareHtmlPageRenderer` and `Drupal\system\Plugin\Block\SystemBrandingBlock` constructors is deprecated.

These parameters will be mandatory in Drupal 12.0.0.

*Source: [theme_get_setting() is deprecated](https://www.drupal.org/node/3035289), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
