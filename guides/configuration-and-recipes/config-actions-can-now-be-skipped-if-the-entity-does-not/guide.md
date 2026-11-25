---
name: config-actions-can-now-be-skipped-if-the-entity-does-not
title: "Config actions can now be skipped if the entity does not exist"
description: "Config actions can now be skipped if the entity does not exist"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3552215
change-record-nid: 3552215
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3552023](https://www.drupal.org/node/3552023)

Recipes can now skip running config actions on entities that don't exist. For example:

```php
config:
  actions:
    ?canvas.component.block.project_browser_block.recipes:
      disable: []
```

This will run the `disable` config action on the `canvas.component.block.project_browser_block.recipes` config entity -- if and only if that entity exists. If it doesn't exist, all of its config actions will be skipped.

This syntax *cannot* be combined with wildcards. So this, for example, will throw an exception:

```php
config:
  actions:
    ?canvas.component.block.system_menu_block.*:
      disable: []
```

The reason this won't work with wildcards is because wildcards, by their nature, *imply* the "skip if not exists" behavior. If a wildcard doesn't turn up any config entities to work on, nothing happens anyway -- so using `?` in combination with that would be redundant.

*Source: [Config actions can now be skipped if the entity does not exist](https://www.drupal.org/node/3552215), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
