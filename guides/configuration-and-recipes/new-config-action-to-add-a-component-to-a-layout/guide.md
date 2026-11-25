---
name: new-config-action-to-add-a-component-to-a-layout
title: "New config action to add a component to a Layout"
description: "New config action to add a component to a Layout"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3519491
change-record-nid: 3519491
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3475115](https://www.drupal.org/node/3475115)

New Config Action for adding new components to config entities using layout builder from recipes.

You can use it like this:

```php
config:
  actions:
    dashboard.dashboard.welcome:
      addComponentToLayout:
        section: 0
        position: 4
        component:
          region:
            layout_twocol_section: 'second'
          default_region: content
          configuration:
            id: dashboard_text_block
            label: 'My new dashboard with weight from a plugin'
            label_display: 'visible'
            provider: 'dashboard'
            context_mapping: { }
            text:
              value: '<p>My new dashboard with weight from plugin</p>'
              format: 'basic_html'
```

The name of the action is addComponentToLayout, and its arguments are:

- **section:** The delta of the section where our new component is going to be added
- **position:** The position at which should be added. Don't confuse this with weight, which will be automatically calculated.
- **component:** An array containing the component definition.

Inside of `component`, we can define a **region** that maps the potential layout with the region inside the layout to use. You can also use **default_region** in case the layout id doesn't match any of the above mapped layout regions.

It will have a **configuration** key, with whatever schema your plugin will expect. At least an **id** with the `plugin_id` will be expected.

This action can be used against any config entity using layout builder. E.g. an entity view display from core, or a dashboard from the contrib module `dashboard`, as in the example.

*Source: [New config action to add a component to a Layout](https://www.drupal.org/node/3519491), a Drupal core change record by [penyaskito](https://www.drupal.org/user/959536) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
