---
name: new-config-action-to-override-static-menu-links
title: "New config action to override static menu links"
description: "New config action to override static menu links"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3570506
change-record-nid: 3570506
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3569949](https://www.drupal.org/node/3569949)

Some menu links are defined in code, by modules' `MODULE.links.menu.yml` files, or in hooks. Core has a service for overriding certain aspects of these links (such as their weight, and whether they are enabled or not). Recipes can now override such links with a config action:

```php
config:
    actions:
        core.menu.static_menu_link_overrides:
            overrideMenuLinks:
                some.link.id:
                    enabled: false
                    weight: 10
                some_other.link_id: null
```

Let's break this down:

The `overrideMenuLinks` config action can only be used on the special `core.menu.static_menu_link_overrides` config name. Trying to use the action on any other config name will throw an exception.

The action takes an array whose keys are menu link IDs, as they would be found in `MODULE.menu.links.yml`. The values are either an array of keys to override for that menu link (`weight` and `enabled` are probably the most useful, but see [https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Menu%21St...](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Menu%21StaticMenuLinkOverrides.php/function/StaticMenuLinkOverrides%3A%3AsaveOverride/11.x) for the full list), or NULL to undo any existing override for that link.

This action ONLY affects menu links defined in code. It will *not* work on menu links that are content entities, such as menu links for nodes or any custom menu link created via the UI.

*Source: [New config action to override static menu links](https://www.drupal.org/node/3570506), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
