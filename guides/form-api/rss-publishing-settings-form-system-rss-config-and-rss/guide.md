---
name: rss-publishing-settings-form-system-rss-config-and-rss
title: "\"RSS publishing\" settings form, system.rss config and RSS viewmode are removed from core"
description: "\"RSS publishing\" settings form, system.rss config and RSS viewmode are removed from core"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3519410
change-record-nid: 3519410
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2601030](https://www.drupal.org/node/2601030)

The "RSS publishing" settings form and RSS viewmode are removed from core. The form was broken and it was not possible to to select that view if you even changed it. The dependencies of that view were also not up to par.

`system.rss` config is also removed from core. This means there is no default fallback configurable for RSS views for node and comment. The upgrade path will update the config, but to fix this make sure you select an explicit view mode (not default) for the RSS items in views.

*Source: ["RSS publishing" settings form, system.rss config and RSS viewmode are removed from core](https://www.drupal.org/node/3519410), a Drupal core change record by [bbrala](https://www.drupal.org/user/3366066) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
