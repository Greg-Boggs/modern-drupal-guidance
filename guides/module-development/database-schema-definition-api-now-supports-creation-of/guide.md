---
name: database-schema-definition-api-now-supports-creation-of
title: "Database Schema Definition API now supports creation of generated columns"
description: "Database Schema Definition API now supports creation of generated columns"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3389683
change-record-nid: 3389683
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3586688](https://www.drupal.org/node/3586688)

The DB Schema Definition added support for generated columns, which can then be part of indexes just like regular ones.

References:\
MySql: [https://dev.mysql.com/doc/refman/9.7/en/create-table-generated-columns.html](https://dev.mysql.com/doc/refman/9.7/en/create-table-generated-columns.html)\
MariaDb: [https://mariadb.com/docs/server/reference/sql-statements/data-definition...](https://mariadb.com/docs/server/reference/sql-statements/data-definition/create/generated-columns)\
PostgreSql: [https://www.postgresql.org/docs/current/ddl-generated-columns.html](https://www.postgresql.org/docs/current/ddl-generated-columns.html)\
SQLite: [https://sqlite.org/gencol.html](https://sqlite.org/gencol.html)

- `Column::generated()` adds the definition of a generated table column.
- `Drupal\Core\Database\SchemaDefinition\GeneratedColumnStorage` enumerates the possible storage options for the generated column.

Example:

```php
    $schemaDefinition = new SchemaDefinition(
      type: SchemaDefinitionType::Test,
      name: 'test_schema',
      tables: [
        new Table(
          name: 'test_table',
          description: 'Basic test table with a generated column.',
          columns: [
            Column::serial(
              name: 'id',
            ),
            Column::varcharAscii(
              name: 'name',
              description: "A person's name",
              length: 255,
              notNull: TRUE,
              default: new StringValue(''),
              binary: TRUE,
            ),
            Column::int(
              name: 'age',
              description: "The person's age",
              size: ColumnSize::Small,
              unsigned: TRUE,
              notNull: TRUE,
              default: new IntValue(0),
            ),
            Column::generated(
              name: 'double_age',
              type: ColumnType::Int,
              description: "The person's age X 2",
              storage: GeneratedColumnStorage::Stored,
              expression: new GeneratedColumnExpression('[age] * 2'),
            ),
            Column::generated(
              name: 'shout',
              type: ColumnType::Varchar,
              description: "The person's name in capitals",
              storage: GeneratedColumnStorage::Virtual,
              length: 512,
              expression: new GeneratedColumnExpression('UPPER([name])'),
            ),
            Column::generated(
              name: 'big_age',
              type: ColumnType::Int,
              description: "The person's age in a wider unsigned column",
              storage: GeneratedColumnStorage::Stored,
              size: ColumnSize::Big,
              unsigned: TRUE,
              expression: new GeneratedColumnExpression('[age] * 100'),
            ),
            Column::generated(
              name: 'half_age',
              type: ColumnType::Numeric,
              description: "Half of the person's age",
              storage: GeneratedColumnStorage::Virtual,
              precision: 10,
              scale: 2,
              expression: new GeneratedColumnExpression('[age] / 2'),
            ),
          ],
          primaryKey: new PrimaryKey(['id']),
          indexes: [
            new Index(
              name: 'double_age',
              columns: ['double_age'],
            ),
          ],
        ),
      ],
    );
```

*Source: [Database Schema Definition API now supports creation of generated columns](https://www.drupal.org/node/3389683), a Drupal core change record by [bradjones1](https://www.drupal.org/user/405824) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
