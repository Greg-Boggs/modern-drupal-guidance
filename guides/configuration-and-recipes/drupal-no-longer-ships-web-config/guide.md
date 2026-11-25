---
name: drupal-no-longer-ships-web-config
title: "Drupal no longer ships web.config"
description: "Drupal no longer ships web.config"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3440842
change-record-nid: 3440842
introduced-in-version: "11.0.0"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0\
Issue links: [#3437335](https://www.drupal.org/node/3437335), [#3358248](https://www.drupal.org/node/3358248)

Drupal no longer ships `web.config` for IIS and will no longer provide IIS-specific support. Bugs are still encouraged to be reported in case they also affect web servers other than IIS.

If your site is running on IIS, you are encouraged to switch to a different webserver, or if you continue to run IIS you will need to ensure your own `web.config` configuration is secure.

*Source: [Drupal no longer ships web.config](https://www.drupal.org/node/3440842), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
