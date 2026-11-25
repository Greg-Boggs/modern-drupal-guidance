---
name: recipes-can-enable-disable-layout-builder-and-layout
title: "Recipes can enable/disable Layout builder and Layout builder overrides via config actions"
description: "Recipes can enable/disable Layout builder and Layout builder overrides via config actions"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3487747
change-record-nid: 3487747
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3486981](https://www.drupal.org/node/3486981)

Three new config actions have been added to Drupal core's Layout Builder module that allow recipe authors to enable or disable Layout builder, and to allow overrides or not on a per entity basis.

`allowLayoutOverrides` - TRUE/FALSE - Toggle overridable layouts\
`enableLayoutBuilder` - \[\] - Enable Layout Builder\
`disableLayoutBuilder` - \[\] - Disable Layout Builder

Usage:

```php
config:
  actions:
    core.entity_view_display.node.*.default:
      enableLayoutBuilder: []
      disableLayoutBuilder: []
      allowLayoutOverrides: true/false
```

*Source: [Recipes can enable/disable Layout builder and Layout builder overrides via config actions](https://www.drupal.org/node/3487747), a Drupal core change record by [thejimbirch](https://www.drupal.org/user/2507260) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
