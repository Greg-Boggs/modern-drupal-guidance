---
name: new-config-action-to-add-blocks-to-navigation
title: "New config action to add blocks to Navigation"
description: "New config action to add blocks to Navigation"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3490147
change-record-nid: 3490147
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3478224](https://www.drupal.org/node/3478224)

[#3478224: Provide Config Action to add new blocks to navigation from recipes](https://www.drupal.org/project/drupal/issues/3478224) added a very simple new config action that can be used to add new blocks to Navigation.

You can use it like this:

```php
config:
  actions:
    navigation.block_layout:
      addNavigationBlock:
        delta: 1
        configuration:
          id: 'navigation_menu:content'
          label: Content From Recipe
          label_display: 1
          provider: navigation
          level: 1
          depth: 2
```

That's it. The name of the action is `addNavigationBlock`, and its arguments are:

- **delta**: The position in the navigation the block is going to be added
- **configuration**: The configuration array for the navigation item

This action can be only used against the `navigation.block_layout` config.

*Source: [New config action to add blocks to Navigation](https://www.drupal.org/node/3490147), a Drupal core change record by [plopesc](https://www.drupal.org/user/282415) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
