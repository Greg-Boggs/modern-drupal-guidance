---
name: drupal-views-entityviewsdata-fieldstoragedefinitions-and
title: "Drupal\\views\\EntityViewsData ::$fieldStorageDefinitions and ::getFieldStorageDefinitions() deprecated"
description: "Drupal\\views\\EntityViewsData ::$fieldStorageDefinitions and ::getFieldStorageDefinitions() deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3240278
change-record-nid: 3240278
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2930736](https://www.drupal.org/node/2930736)

`Drupal\views\EntityViewsData::$fieldStorageDefinitions` and `Drupal\views\EntityViewsData::getFieldStorageDefinitions()` have both been deprecated. These were protected properties/methods and no replacement is provided. The field schema should be obtained directly from the field definition now.

Before:\
`$field_schema = $this->getFieldStorageDefinitions()[$field_name]->getSchema();`

After\
`$field_schema = $field_definition->getFieldStorageDefinition()->getSchema();`

*Source: [Drupal\views\EntityViewsData ::$fieldStorageDefinitions and ::getFieldStorageDefinitions() deprecated](https://www.drupal.org/node/3240278), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
