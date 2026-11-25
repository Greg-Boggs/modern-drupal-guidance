---
name: drupal-node-nodepermissions-now-requires
title: "Drupal\\node\\NodePermissions now requires EntityTypeManagerInterface in its constructor"
description: "Drupal\\node\\NodePermissions now requires EntityTypeManagerInterface in its constructor"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3526030
change-record-nid: 3526030
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3092001](https://www.drupal.org/node/3092001)

`Drupal\node\NodePermissions::construct()` now requires a single `EntityTypeManagerInterface` argument. This class is @internal so the change should not affect contrib or custom code.

*Source: [Drupal\node\NodePermissions now requires EntityTypeManagerInterface in its constructor](https://www.drupal.org/node/3526030), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
