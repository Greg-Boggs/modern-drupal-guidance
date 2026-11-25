---
name: new-config-contraint-nofielditemsexistwithhighercardinality
title: "New config contraint: NoFieldItemsExistWithHigherCardinality"
description: "New config contraint: NoFieldItemsExistWithHigherCardinality"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3516311
change-record-nid: 3516311
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3513035](https://www.drupal.org/node/3513035)

A new config schema constraint has been added: `NoFieldItemsExistWithHigherCardinality`. This constraint checks that cardinality of a field is not set lower than the maximum delta of items for the field on any entity.

First used in core in `field.schema.yml`:

```php
      constraints:
        NoFieldItemsExistWithHigherCardinality:
          entityType: '%parent.entity_type'
          fieldName: '%parent.field_name'
```

*Source: [New config contraint: NoFieldItemsExistWithHigherCardinality](https://www.drupal.org/node/3516311), a Drupal core change record by [bbrala](https://www.drupal.org/user/3366066) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
