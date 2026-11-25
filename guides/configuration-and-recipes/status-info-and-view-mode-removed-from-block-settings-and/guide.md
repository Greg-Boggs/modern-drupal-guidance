---
name: status-info-and-view-mode-removed-from-block-settings-and
title: "'status', 'info' and 'view_mode' removed from block_settings and added in block_content config schema"
description: "'status', 'info' and 'view_mode' removed from block_settings and added in block_content config schema"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3445040
change-record-nid: 3445040
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3379725](https://www.drupal.org/node/3379725)

The config schema for Block config entities (type: `block.block.*`), and specifically the "base settings" for block plugins (type: `block_settings`) contains three key-value pairs (`status`, `info` and `view_mode`) that actually are block_content block-specific.

Hence, these 3 key-value pairs are removed from `block_settings` and added in new type: `block.settings.block_content:*:`

**Before**

```php
block_settings:
  type: mapping
  label: 'Block settings'
  mapping:
    id:
      type: string
      label: 'ID'
    label:
      type: label
      label: 'Description'
    label_display:
      type: string
      label: 'Display title'
    provider:
      type: string
      label: 'Provider'
    status:
      type: boolean
      label: 'Status'
    info:
      type: label
      label: 'Admin info'
    view_mode:
      type: string
      label: 'View mode'
    context_mapping:
      type: sequence
      label: 'Context assignments'
      sequence:
        type: string
```

**After**

```php
block.settings.block_content:*:
  type: block_settings
  label: 'Content block'
  constraints:
    FullyValidatable: ~
  mapping:
    # @see \Drupal\block_content\Plugin\Block\BlockContentBlock::defaultConfiguration()
    # @todo Deprecate this in https://www.drupal.org/project/drupal/issues/3426302
    status:
      type: boolean
      label: 'Status'
    # @todo Deprecate this in https://www.drupal.org/project/drupal/issues/3426302
    info:
      type: label
      label: 'Admin info'
    view_mode:
      type: string
      label: 'View mode'
      constraints:
        ConfigExists:
          prefix: core.entity_view_mode.block_content.
```

*Source: ['status', 'info' and 'view_mode' removed from block_settings and added in block_content config schema](https://www.drupal.org/node/3445040), a Drupal core change record by [narendrar](https://www.drupal.org/user/1730192) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
