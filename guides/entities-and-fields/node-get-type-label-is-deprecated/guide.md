---
name: node-get-type-label-is-deprecated
title: "node_get_type_label is deprecated"
description: "node_get_type_label is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3533301
change-record-nid: 3533301
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3531943](https://www.drupal.org/node/3531943)

`node_get_type_label` is deprecated.

**If on 11.3 or above**\
Use `$node->getBundleEntity()->label()` instead.

**If on 11.2 or below**\
Use `$node->get('type')->entity->label()` instead.

*Source: [node_get_type_label is deprecated](https://www.drupal.org/node/3533301), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
