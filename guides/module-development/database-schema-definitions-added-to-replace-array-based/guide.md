---
name: database-schema-definitions-added-to-replace-array-based
title: "Database Schema Definitions added to replace array-based structure"
description: "Database Schema Definitions added to replace array-based structure"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3557405
change-record-nid: 3557405
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3411490](https://www.drupal.org/node/3411490), [#3557481](https://www.drupal.org/node/3557481), [#3558426](https://www.drupal.org/node/3558426)

This introduces the Database Schema Definition to replace the current way of defining a table's structure via a nested array, with a structure of value objects defined in the `Drupal\Core\Database\SchemaDefinition` namespace.

This structure is immutable and database abstract.

In the future, the db-specific field types in the existing array-based schema definition will no longer be defined here and database drivers will be able to implement db-specific features such as GIN and GIST indexes. It will also allow for better introspection of database schema, and validation of properties.

### Schema definition changes

#### Before

```php
    $schema = [
      'description' => 'The base table for configuration data.',
      'fields' => [
        'collection' => [
          'description' => 'Primary Key: Config object collection.',
          'type' => 'varchar_ascii',
          'length' => 255,
          'not null' => TRUE,
          'default' => '',
        ],
        'name' => [
          'description' => 'Primary Key: Config object name.',
          'type' => 'varchar_ascii',
          'length' => 255,
          'not null' => TRUE,
          'default' => '',
        ],
        'data' => [
          'description' => 'A serialized configuration object data.',
          'type' => 'blob',
          'not null' => FALSE,
          'size' => 'big',
        ],
      ],
      'primary key' => ['collection', 'name'],
    ];
```

#### After

Note the usage of named parameters. In the future, these could allow more flexibility when it comes to adding, changing, deprecating, and removing function arguments.

```php
    new Table(
      name: 'config',
      description: 'The base table for configuration data.',
      columns: [
        new Column(
          name: 'collection',
          description: 'Primary Key: Config object collection.',
          type: ColumnType::VarcharAscii,
          length: 255,
          notNull: TRUE,
          default: new StringValue(''),
        ),
        new Column(
          name: 'name',
          description: 'Primary Key: Config object name.',
          type: ColumnType::VarcharAscii,
          length: 255,
          notNull: TRUE,
          default: new StringValue(''),
        ),
        new Column(
          name: 'data',
          description: 'A serialized configuration object data.',
          type: ColumnType::Blob,
          notNull: FALSE,
          size: ColumnSize::Big,
        ),
      ],
      primaryKey: new PrimaryKey(['collection', 'name']),
    );
```

### hook_schema() changes

Refer to database.api.php for a full example.

#### Before

```php
/**
 * Implements hook_schema().
 */
function system_schema(): array {
  $schema['my_table'] = [
    ...
  ];

  return $schema;
}
```

#### After

```php
/**
 * Implements hook_schema().
 */
function system_schema(): Schema {
    $tables[] = new Table(
      name: 'my_table',
      ...
    );

    return new Schema(
      type: SchemaDefinitionType::Module,
      name: 'system',
      tables: $tables,
    );
}
```

### Storage handlers

#### Before

```php
  /**
   * Check if the table exists and create it if not.
   */
  protected function ensureTableExists() {
    try {
      $database_schema = $this->connection->schema();
      $schema_definition = $this->schemaDefinition();
      $database_schema->createTable(static::TABLE_NAME, $schema_definition);
    }
    // If another process has already created the batch table, attempting to
    // recreate it will throw an exception. In this case just catch the
    // exception and do nothing.
    catch (DatabaseException) {
    }
    catch (\Exception) {
      return FALSE;
    }
    return TRUE;
  }

  public function schemaDefinition() {
    return [
      ...
    ];
  }
```

#### After

```php
  /**
   * Check if the table exists and create it if not.
   */
  protected function ensureTableExists() {
    try {
      $this->connection->schema()->createSchemaFromDefinition($this->schemaDefinition());
    }
    // If another process has already created the batch table, attempting to
    // recreate it will throw an exception. In this case just catch the
    // exception and do nothing.
    catch (DatabaseException) {
    }
    catch (\Exception) {
      return FALSE;
    }
    return TRUE;
  }

  public function schemaDefinition(): Schema {
    $tables[] = new Table(
      name: 'my_storage_table',
      ...
    );

    return new Schema(
      type: SchemaDefinitionType::Storage,
      name: 'my_storage',
      tables: $tables,
    );
  }
```

*Source: [Database Schema Definitions added to replace array-based structure](https://www.drupal.org/node/3557405), a Drupal core change record by [mradcliffe](https://www.drupal.org/user/157079) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
