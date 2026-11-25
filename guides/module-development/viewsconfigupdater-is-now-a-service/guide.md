---
name: viewsconfigupdater-is-now-a-service
title: "ViewsConfigUpdater is now a service"
description: "ViewsConfigUpdater is now a service"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3530638
change-record-nid: 3530638
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3529274](https://www.drupal.org/node/3529274)

`Drupal\views\ViewsConfigUpdater` is now a service to properly persist the `$deprecationsEnabled` property.

Before:\
`\Drupal::classResolver('Drupal\views\ViewsConfigUpdater');`

After:\
`\Drupal::service('Drupal\views\ViewsConfigUpdater');`

*Source: [ViewsConfigUpdater is now a service](https://www.drupal.org/node/3530638), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
