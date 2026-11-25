---
name: defaultpluginmanager-uses-attribute-before-annotation
title: "DefaultPluginManager uses attribute before annotation during discovery"
description: "DefaultPluginManager uses attribute before annotation during discovery"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3521588
change-record-nid: 3521588
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3397318](https://www.drupal.org/node/3397318)

Attributes are parsed first, so for plugin classes that have both, the definition will be parsed from attributes.

[When plugin discovery by PHP attributes was introduced](https://www.drupal.org/project/drupal/issues/3252386), annotations in the plugin classes were parsed before attributes. This meant that if a plugin class had both the plugin attribute and plugin annotation (for backwards compatibility), then the plugin definition would be parsed from the annotation values, not the attribute values.

*Source: [DefaultPluginManager uses attribute before annotation during discovery](https://www.drupal.org/node/3521588), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
