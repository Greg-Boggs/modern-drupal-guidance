---
name: the-d8-config-migrate-source-plugin-is-replaced-by-the
title: "The d8_config migrate source plugin is replaced by the config_entity plugin"
description: "The d8_config migrate source plugin is replaced by the config_entity plugin"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3508578
change-record-nid: 3508578
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3506605](https://www.drupal.org/node/3506605)

The class `Drupal\migrate_drupal\Plugin\migrate\source\d8\Config` is deprecated. This class provides the `d8_config` migrate source plugin.

The new class `Drupal\migrate\Plugin\migrate\source\ConfigEntity` provides the `config_entity` migrate source plugin, which is essentially identical to the `d8_config` plugin.

### Before Drupal 11.2.0

A migration can declare the `d8_config` source plugin:

```php
source
  plugin: d8_config
  names:
    - node.type.article
    - node.type.page
```

The `migrate_drupal` module must be enabled in order to use this migration.

### Drupal 11.2.0 and later

A migration can declare the `config_entity` source plugin:

```php
source
  plugin: config_entity
  names:
    - node.type.article
    - node.type.page
```

The `migrate` module must be enabled in order to use this migration.

### Contrib and Custom Source Plugins

The deprecated class extends `Drupal\migrate_drupal\Plugin\migrate\source\DrupalSqlBase`, which extends `Drupal\migrate\Plugin\migrate\source\SqlBase`. The new class extends `SqlBase` directly.

Any contrib or custom source plugins that currently extend `Config` from the `migrate_drupal` module should be updated to extend `ConfigEntity` from the `migrate` module. They may need further work because the properties and methods of `DrupalSqlBase` are no longer available.

*Source: [The d8_config migrate source plugin is replaced by the config_entity plugin](https://www.drupal.org/node/3508578), a Drupal core change record by [benjifisher](https://www.drupal.org/user/683300) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
