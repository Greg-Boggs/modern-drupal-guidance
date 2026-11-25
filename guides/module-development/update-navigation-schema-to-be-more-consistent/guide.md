---
name: update-navigation-schema-to-be-more-consistent
title: "Update Navigation schema to be more consistent"
description: "Update Navigation schema to be more consistent"
drupal-core: ">=11.0.6"
source-url: https://www.drupal.org/node/3478781
change-record-nid: 3478781
introduced-in-version: "11.0.6"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.6\
Issue links: [#3474123](https://www.drupal.org/node/3474123)

Navigation schema had all the settings at the same level. Many of those settings related to the navigation logo.

To make Navigation schema more readable and escalable in the future, the settings have been reorganized in different levels.

**Before**\
Schema file:

```php
navigation.settings:
  type: config_object
  label: 'Navigation settings'
  constraints:
    FullyValidatable: ~
  mapping:
    logo_provider:
      type: string
      label: 'Select Navigation logo handling'
      constraints:
        Choice:
          - default
          - hide
          - custom
    logo_managed:
      type: integer
      label: 'Custom logo'
      nullable: true
      constraints:
        Range:
          min: 0
    logo_max_filesize:
      type: integer
      label: 'Maximum file sizes (bytes)'
      constraints:
        NotNull: [ ]
        Range:
          min: 0
    logo_height:
      type: integer
      label: 'Logo expected height'
      constraints:
        NotNull: [ ]
        Range:
          min: 0
    logo_width:
      type: integer
      label: 'Logo expected width'
      constraints:
        NotNull: [ ]
        Range:
          min: 0
```

Config file:

```php
logo_provider: default
logo_managed: null
logo_max_filesize: 1048576
logo_height: 40
logo_width: 40
```

**After**\
Schema file:

```php
navigation.settings:
  type: config_object
  label: 'Navigation settings'
  constraints:
    FullyValidatable: ~
  mapping:
    logo:
      type: mapping
      label: 'Logo settings'
      mapping:
        provider:
          type: string
          label: 'Select Navigation logo handling'
          constraints:
            Choice:
              - default
              - hide
              - custom
        managed:
          type: integer
          label: 'Custom logo'
          nullable: true
          constraints:
            Range:
              min: 0
        max:
          type: mapping
          label: 'Logo maximum settings'
          mapping:
            filesize:
              type: integer
              label: 'Maximum file sizes (bytes)'
              constraints:
                NotNull: [ ]
                Range:
                  min: 0
            height:
              type: integer
              label: 'Logo expected height'
              constraints:
                NotNull: [ ]
                Range:
                  min: 0
            width:
              type: integer
              label: 'Logo expected width'
              constraints:
                NotNull: [ ]
                Range:
                  min: 0
          constraints:
            ValidKeys: '<infer>'
      constraints:
        ValidKeys: '<infer>'
```

Config file:

```php
logo:
  provider: default
  managed: null
  max:
    filesize: 1048576
    height: 40
    width: 40
```

*Source: [Update Navigation schema to be more consistent](https://www.drupal.org/node/3478781), a Drupal core change record by [plopesc](https://www.drupal.org/user/282415) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
