---
name: added-methods-to-add-dependencies-to-a-migration
title: "Added methods to add dependencies to a migration"
description: "Added methods to add dependencies to a migration"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3471509
change-record-nid: 3471509
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3464320](https://www.drupal.org/node/3464320)

Methods `\Drupal\migrate\Plugin\Migration::addRequiredDependencies()`and `\Drupal\migrate\Plugin\Migration::addOptionalDependencies()` are added to simplify adding dependencies to migration plugins.

Both methods have one argument: an array of migration IDs. They both return the migration object, so they can be chained with other methods.

### Examples

#### addRequiredDependencies

`$migration->addRequiredDependencies(['my_project_users', 'my_project_categories']);`

#### addOptionalDependencies()

`$migration->addOptionalDependencies(['my_project_block', 'my_project_menu']);`

With these new methods, we can now simplify some code:

#### Before Drupal 11.2.0

```php
    $migration_dependencies = $migration->getMigrationDependencies();
    array_push($migration_dependencies['required'], $this->getEntityTypeMigrationId());
    $migration_dependencies['required'] = array_unique($migration_dependencies['required']);
    $migration->set('migration_dependencies', $migration_dependencies);
```

#### Starting with Drupal 11.2.0

```php
    $migration->addRequiredDependencies([$this->getEntityTypeMigrationId()]);
```

*Source: [Added methods to add dependencies to a migration](https://www.drupal.org/node/3471509), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
