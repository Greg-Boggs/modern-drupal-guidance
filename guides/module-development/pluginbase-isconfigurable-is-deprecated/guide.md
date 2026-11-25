---
name: pluginbase-isconfigurable-is-deprecated
title: "PluginBase::isConfigurable() is deprecated"
description: "PluginBase::isConfigurable() is deprecated"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3459535
change-record-nid: 3459535
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3459533](https://www.drupal.org/node/3459533)

Calling \Drupal\Component\Plugin\PluginBase->isConfigurable() is deprecated.

Use `instanceof` to check for if a plugin uses the ConfigurableInterface.

#### Example

**Before:**\
` if ($plugin->isConfigurable()) { }`\
**After:**\
`if ($plugin instanceof ConfigurableInterface) { }`

*Source: [PluginBase::isConfigurable() is deprecated](https://www.drupal.org/node/3459535), a Drupal core change record by [mikelutz](https://www.drupal.org/user/2972409) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
