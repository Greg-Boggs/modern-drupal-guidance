---
name: locale-config-batch-set-config-langcodes-and-locale-config
title: "locale_config_batch_set_config_langcodes() and locale_config_batch_update_config_translations() are deprecated"
description: "locale_config_batch_set_config_langcodes() and locale_config_batch_update_config_translations() are deprecated"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3475054
change-record-nid: 3475054
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3422977](https://www.drupal.org/node/3422977)

Deprecate the following `locale_config_batch_` functions.

| Before | After |
| --- | --- |
| `locale_config_batch_set_config_langcodes(&$context)` | `locale_config_batch_update_default_config_langcodes(&$context)` |
| `locale_config_batch_refresh_name(array $names, array $langcodes, &$context)` | `locale_config_batch_update_config_translations($names, $langcodes, &$context)` |

*Source: [locale_config_batch_set_config_langcodes() and locale_config_batch_update_config_translations() are deprecated](https://www.drupal.org/node/3475054), a Drupal core change record by [nexusnovaz](https://www.drupal.org/user/3783812) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
