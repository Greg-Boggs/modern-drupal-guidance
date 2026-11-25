---
name: link-field-widget-supports-route-route-name
title: "Link field widget supports route:{$route_name}"
description: "Link field widget supports route:{$route_name}"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3367114
change-record-nid: 3367114
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3115188](https://www.drupal.org/node/3115188)

Previously

`route:view.frontpage.page_1` entered in link widget after save would strip the `route:` on a resave.

Now

`route:view.frontpage.page_1` entered in link widget after save will not strip the `route:` on a resave.

*Source: [Link field widget supports route:{$route_name}](https://www.drupal.org/node/3367114), a Drupal core change record by [heddn](https://www.drupal.org/user/1463982) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
