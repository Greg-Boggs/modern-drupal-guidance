---
name: there-is-a-new-theme-extension-object-system-region-list
title: "There is a new Theme extension object. system_region_list() and system_default_region() and region related constants are deprecated"
description: "There is a new Theme extension object. system_region_list() and system_default_region() and region related constants are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3015925
change-record-nid: 3015925
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3015812](https://www.drupal.org/node/3015812)

There is a new Theme extension object.\
This has three new methods:

- `listAllRegions`
- `listVisibleRegions`
- `getDefaultRegion`

`REGIONS_VISIBLE` and `REGIONS_ALL` in both `system.module` and `BlockRepositoryInterface` have been deprecated with no replacement.

`system_region_list` and `system_default_region` have both been deprecated.\
Use the following instead.

- \Drupal::service('theme_handler')->getTheme()->listAllRegions()
- \Drupal::service('theme_handler')->getTheme()->listVisibleRegions()
- \Drupal::service('theme_handler')->getTheme()->getDefaultRegion()

All helper methods wrapping the global functions also have been deprecated as well:

- `\Drupal\block\BlockListBuilder::systemRegionList()` use `$this->themeHandler->getTheme()->listAllRegions()` or `$this->themeHandler->getTheme()->listVisibleRegions() ` instead.
- `\Drupal\block\Controller\BlockController::getVisibleRegionNames()` use `$this->themeHandler->getTheme()->listVisibleRegions()` instead.
- `\Drupal\block_place\Plugin\DisplayVariant\PlaceBlockPageVariant::getVisibleRegionNames()` use `$this->themeHandler->getTheme()->listVisibleRegions()` instead.

Several methods on the `ThemeHandler` return an array of `Theme` objects instead of `Extension` objects. As `Theme` extends from `Extension` this is allowed. These methods are:

- `\Drupal\Core\Extension\ThemeHandlerInterface::listInfo()`
- `\Drupal\Core\Extension\ThemeHandlerInterface::rebuildThemeData()`

`\Drupal\Core\Extension\ThemeHandlerInterface::getTheme()` now returns a `Theme` object.

Breaking changes\
`\Drupal\Core\Extension\ThemeHandlerInterface::addTheme()` now only accepts a `Theme` object.

*Source: [There is a new Theme extension object. system_region_list() and system_default_region() and region related constants are deprecated](https://www.drupal.org/node/3015925), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
