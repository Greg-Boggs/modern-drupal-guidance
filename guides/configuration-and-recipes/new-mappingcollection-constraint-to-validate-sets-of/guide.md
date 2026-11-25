---
name: new-mappingcollection-constraint-to-validate-sets-of
title: "New MappingCollection constraint to validate sets of required and optional fields"
description: "New MappingCollection constraint to validate sets of required and optional fields"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3558879
change-record-nid: 3558879
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3535734](https://www.drupal.org/node/3535734)

A new constraint `MappingCollection` has been added to Drupal core. The constraint can be used that at least one of a set of given constraints is satisfied. The `MappingCollection` constraint extends Symfony's `Collection` constraint class and allows the constraints within the mapping to provided by ID.

The first usage is in `layout_builder.schema.yml`, to validate in the `inline_block` configuration schema that either the `block_serialized` property or the `block_id` and `block_revision_id` properties are provided.

*Source: [New MappingCollection constraint to validate sets of required and optional fields](https://www.drupal.org/node/3558879), a Drupal core change record by [bbrala](https://www.drupal.org/user/3366066) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
