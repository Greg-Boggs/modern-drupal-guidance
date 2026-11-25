---
name: node-type-get-names-is-deprecated
title: "node_type_get_names is deprecated"
description: "node_type_get_names is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3534849
change-record-nid: 3534849
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3534587](https://www.drupal.org/node/3534587)

`node_type_get_names` is deprecated, a new method on the `entity_type.bundle.info` service has been added to provide the same functionality for any entity type.

Before:\
`$type_names = node_type_get_names();`

After:\
`$type_names = \Drupal::service('entity_type.bundle.info')->getBundleLabels('node');`

*Source: [node_type_get_names is deprecated](https://www.drupal.org/node/3534849), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
