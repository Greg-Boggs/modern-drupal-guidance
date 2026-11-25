---
name: block-content-module-no-longer-ships-with-field-storage
title: "Block content module no longer ships with field.storage.block_content.body.yml"
description: "Block content module no longer ships with field.storage.block_content.body.yml"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3548819
change-record-nid: 3548819
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3548762](https://www.drupal.org/node/3548762)

The block content module will no longer ship with field.storage.block_content.body.yml. Modules, recipes, or profiles that rely on that file can use block_content_storage_body_field until Drupal 13. But it's advised to just ship with your own copy of field.storage.block_content.body.yml.

```php
langcode: en
status: true
dependencies:
  module:
    - block_content
    - text
id: block_content.body
field_name: body
entity_type: block_content
type: text_with_summary
settings: {  }
module: text
locked: false
cardinality: 1
translatable: true
indexes: {  }
persist_with_no_fields: true
custom_storage: false
```

*Source: [Block content module no longer ships with field.storage.block_content.body.yml](https://www.drupal.org/node/3548819), a Drupal core change record by [smustgrave](https://www.drupal.org/user/3252890) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
