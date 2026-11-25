---
name: deprecations-in-path-alias-modules-to-remove-the-term
title: "Deprecations in path_alias modules to remove the term 'whitelist'"
description: "Deprecations in path_alias modules to remove the term 'whitelist'"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3467559
change-record-nid: 3467559
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3151086](https://www.drupal.org/node/3151086)

The following from the path_alias module have been renamed to use a meaningful term and avoid the use of 'whitelist'.

|   | Before | After |
| --- | --- | --- |
| Interface | \Drupal\path_alias\AliasWhitelistInterface | \Drupal\path_alias\AliasPrefixListInterface |
| Class | \Drupal\path_alias\AliasWhitelist | \Drupal\path_alias\AliasPrefixList |
| method | \Drupal\path_alias\AliasManager::pathAliasWhitelistRebuild | \Drupal\path_alias\AliasManager::pathAliasPrefixListRebuild |
| route | path_alias_whitelist | path_alias_prefix_list |

*Source: [Deprecations in path_alias modules to remove the term 'whitelist'](https://www.drupal.org/node/3467559), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
