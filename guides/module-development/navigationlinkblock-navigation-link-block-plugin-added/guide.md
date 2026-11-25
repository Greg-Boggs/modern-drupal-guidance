---
name: navigationlinkblock-navigation-link-block-plugin-added
title: "NavigationLinkBlock (navigation_link) block plugin added"
description: "NavigationLinkBlock (navigation_link) block plugin added"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3449479
change-record-nid: 3449479
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3445993](https://www.drupal.org/node/3445993)

As part of work on the currently experiemental navigation module, we added a new block plugin meant to be used by navigation. The new plugin is defined by `\Drupal\navigation\Plugin\Block\NavigationLinkBlock` with machine name `navigation_link`.

At present, its main goal is to simplify code complexity for when single links need to be added to the navigation, outside the context of a menu. Specifically, with a look towards the following issues:

[#3441576: Add a new "Navigation user links" menu in favor of hardcoded links in NavigationUserBlock](https://www.drupal.org/project/drupal/issues/3441576)\
[#3441118: Add the user image to the user menu when available](https://www.drupal.org/project/drupal/issues/3441118)

It's also worth noting that the `navigation_link` block plugin is currently hidden from the Navigation layout and Block layout pages. This is due to UX concerns, e.g. the potential proliferation of many single link blocks. This may change in the future.

Navigation module hides the `navigation_link` block plugin via an alter hook. As a developer, if you have a strong reason to make use of this block plugin, you could implement the following alter hook, taking care to ensure it runs after the corresponding navigation alter hook. This will then make it available for use in the Navigation blocks UI:

```php
/**
 * Implements hook_plugin_filter_TYPE__CONSUMER_alter().
 */
function mymodule_plugin_filter_block__layout_builder_alter(array &$definitions, array $extra) {
  if (($extra['section_storage'] ?? NULL) instanceof NavigationSectionStorage) {
    /** @var \Drupal\Core\Block\BlockManagerInterface $block_manager */
    $block_manager = \Drupal::service(BlockManagerInterface::class);
    $definitions['navigation_link'] = $block_manager->getDefinition('navigation_link');
  }
}
```

*Source: [NavigationLinkBlock (navigation_link) block plugin added](https://www.drupal.org/node/3449479), a Drupal core change record by [m4olivei](https://www.drupal.org/user/410384) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
