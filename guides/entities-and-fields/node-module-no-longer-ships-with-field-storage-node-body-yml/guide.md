---
name: node-module-no-longer-ships-with-field-storage-node-body-yml
title: "Node module no longer ships with field.storage.node.body.yml"
description: "Node module no longer ships with field.storage.node.body.yml"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3540814
change-record-nid: 3540814
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3447617](https://www.drupal.org/node/3447617)

Starting in 11.3.x the node module will no longer ships with `field.storage.node.body.yml`. Modules, recipes, or profiles that rely on that file can use `node_storage_body_field` until Drupal 13. But it's advised to just ship with your own copy of `field.storage.node.body.yml`.

```php
langcode: en
status: true
dependencies:
  module:
    - node
    - text
id: node.body
field_name: body
entity_type: node
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

*Source: [Node module no longer ships with field.storage.node.body.yml](https://www.drupal.org/node/3540814), a Drupal core change record by [smustgrave](https://www.drupal.org/user/3252890) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
