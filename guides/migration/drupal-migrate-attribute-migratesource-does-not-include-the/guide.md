---
name: drupal-migrate-attribute-migratesource-does-not-include-the
title: "\\Drupal\\migrate\\Attribute\\MigrateSource does not include the source_module property"
description: "\\Drupal\\migrate\\Attribute\\MigrateSource does not include the source_module property"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3306373
change-record-nid: 3306373
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3009349](https://www.drupal.org/node/3009349)

Only Migrate source plugins that extend `\Drupal\migrate_drupal\Plugin\migrate\source\DrupalSqlBase` are required to declare `source_module` in their annotation. Previously, the requirement extended to all Migrate source plugins, including those not being used to migrate a Drupal 6 or Drupal 7 source site.

Source plugins can use attributes (`\Drupal\migrate\Attribute\MigrateSource`) or annotations (`\Drupal\migrate\Annotation\MigrateSource`). The attribute class does not include the `source_module`, so only annotation-based source plugins can declare that property in their definitions. Any source plugin supports `source_module` in its configuration.

If you use `source_module` in Migrate source plugins that do not extend `DrupalSqlBase`, then the property `source_module` can still be added and used according to your needs. However, the plugin manager in the `migrate_drupal` module may issue a deprecation message if you specify `source_module` when it is not needed. You can avoid the deprecation message by including either "Drupal 6" or "Drupal 7" in `migration_tags` in the migration that uses the source plugin. You can also customize the list of relevant tags in the `migrate_drupal.settings` config object.

### Before Drupal 11.2.0

All source plugins use annotations. The `source_module` property is supported, and it is required for source plugins that extend `DrupalSqlBase`.

For example, the `embedded_data` source plugin is defined in `core/modules/migrate/src/Plugin/migrate/source/EmbeddedDataSource.php`:

```php
namespace Drupal\migrate\Plugin\migrate\source;

use Drupal\migrate\Plugin\MigrationInterface;

/**
 * Allows source data to be defined in the configuration of the source plugin.
 * ...
 *
 * @MigrateSource(
 *   id = "embedded_data",
 *   source_module = "migrate"
 * )
 */
class EmbeddedDataSource extends SourcePluginBase {
  // ...
}
```

The `block_content_body_field` migration, defined in `core/modules/block_content/migrations/block_content_body_field.yml`, uses `embedded_data` and overrides `source_module` in its configuration:

```php
id: block_content_body_field
label: Block content body field configuration
migration_tags:
  - Drupal 6
  - Drupal 7
  - Configuration
source:
  plugin: embedded_data
  # ...
  source_module: block
# ...
```

Similarly, the `variable` plugin, defined in `core/modules/migrate_drupal/src/Plugin/migrate/source/Variable.php`:

```php
namespace Drupal\migrate_drupal\Plugin\migrate\source;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\migrate\Plugin\MigrationInterface;

/**
 * Drupal 6/7 variable source from database.
 * ...
 * @MigrateSource(
 *   id = "variable",
 *   source_module = "system",
 * )
 */
class Variable extends DrupalSqlBase {
  // ...
}
```

The `d7_node_settings` migration, defined in `core/modules/node/migrations/d7_node_settings.yml`, uses the `variable` source plugin and overrides `source_module`:

```php
id: d7_node_settings
label: Node configuration
migration_tags:
  - Drupal 7
  - Configuration
source:
  plugin: variable
  variables:
    - node_admin_theme
  source_module: node
#...
```

### Starting in Drupal 11.2.0

The `embedded_data` source plugin uses attributes and does not specify `source_module`:

```php
namespace Drupal\migrate\Plugin\migrate\source;

use Drupal\migrate\Attribute\MigrateSource;
use Drupal\migrate\Plugin\MigrationInterface;

/**
 * Allows source data to be defined in the configuration of the source plugin.
 * ...
 */
#[MigrateSource('embedded_data')]
class EmbeddedDataSource extends SourcePluginBase {
  // ...
}
```

There is no change in the `block_content_body_field` migration. It still uses the `embedded_data` source plugin, and it still declares `source_module` in its configuration.

Since the `variable` source plugin extends `DrupalSqlBase`, there is no change. It still uses annotations, and it still specifies `source_module` in its definition.

There is also no change in the `d7_node_settings` migration. It still uses the `variable` source plugin, and it still overrides `source_module` in its configuration.

*Source: [\Drupal\migrate\Attribute\MigrateSource does not include the source_module property](https://www.drupal.org/node/3306373), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
