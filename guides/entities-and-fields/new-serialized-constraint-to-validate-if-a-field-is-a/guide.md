---
name: new-serialized-constraint-to-validate-if-a-field-is-a
title: "New Serialized constraint to validate if a field is a serialized value"
description: "New Serialized constraint to validate if a field is a serialized value"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3558881
change-record-nid: 3558881
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3535734](https://www.drupal.org/node/3535734)

A new constraint `Serialized` has been added to Drupal core. The constraint can be used to validate that a value is serialized string, and it does this validation by confirming the value can be successfully unserialized.

The first usage is in `layout_builder.schema.yml`, to validate the `block_serialized` property in the `inline_block`.

*Source: [New Serialized constraint to validate if a field is a serialized value](https://www.drupal.org/node/3558881), a Drupal core change record by [bbrala](https://www.drupal.org/user/3366066) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
