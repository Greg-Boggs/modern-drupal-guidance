---
name: node-mass-update-is-deprecated
title: "node_mass_update() is deprecated"
description: "node_mass_update() is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3533315
change-record-nid: 3533315
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3533083](https://www.drupal.org/node/3533083)

`node_mass_update()` is deprecated.

Use `\Drupal::service(\Drupal\node\NodeBulkUpdate::class)->process()` instead.

Example

```php
\Drupal::service(NodeBulkUpdate::class)->process($nodes, ['status' => 0], NULL, TRUE);
```

`core/modules/node/node.admin.inc` has been deprecated as well, since `node_mass_update()` is the only function in that file.

*Source: [node_mass_update() is deprecated](https://www.drupal.org/node/3533315), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
