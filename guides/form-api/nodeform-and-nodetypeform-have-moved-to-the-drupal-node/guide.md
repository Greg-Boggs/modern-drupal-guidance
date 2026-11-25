---
name: nodeform-and-nodetypeform-have-moved-to-the-drupal-node
title: "NodeForm and NodeTypeForm have moved to the Drupal\\node\\Form namespace"
description: "NodeForm and NodeTypeForm have moved to the Drupal\\node\\Form namespace"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3517871
change-record-nid: 3517871
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2391313](https://www.drupal.org/node/2391313)

The forms, `Drupal\node\NodeForm` and `Drupal\node\NodeTypeForm` have moved to the `node/src/Form` directory. Previously, they were in the root of node module, `node/src`. They are moved for consistency.

Their namespaces have changed:\
`Drupal\node\NodeForm` is now `Drupal\node\Form\NodeForm`\
`Drupal\node\NodeTypeForm` is now `Drupal\node\Form\NodeTypeForm`

*Source: [NodeForm and NodeTypeForm have moved to the Drupal\node\Form namespace](https://www.drupal.org/node/3517871), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
