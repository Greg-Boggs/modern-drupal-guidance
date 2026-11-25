---
name: content-export-command-added-to-help-with-recipe-development
title: "`content:export` command added to help with recipe development"
description: "`content:export` command added to help with recipe development"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3533854
change-record-nid: 3533854
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3532694](https://www.drupal.org/node/3532694), [#3532951](https://www.drupal.org/node/3532951), [#3547119](https://www.drupal.org/node/3547119)

Recipes have been able to include default content ([Recipe authoring > Provide content](https://project.pages.drupalcode.org/distributions_recipes/recipe_author_guide.html?h=import#provide-content)) since they were first introduced to core. However, *creating* that default content has not been supported by core; it was necessary to use the contributed [Default Content](https://www.drupal.org/project/default_content) module to export content from Drupal into the format used by recipes.

As of [#3532694: Add a command-line utility to export content in YAML format](https://www.drupal.org/project/drupal/issues/3532694), Drupal core now includes a command-line tool to export content in that format. It can export a single entity at a time, but it is also possible to export the dependencies of the entity automatically (for example, images attached to it or taxonomy terms it references).

### How to use

To use it, run the following from the Drupal root:

```php
php core/scripts/drupal content:export <ENTITY_TYPE_ID> <ENTITY_ID>
```

For example: `php core/scripts/drupal content:export taxonomy_term 40`

This will output a dump of the entity's data in YAML format. You can save it to a file like this: `php core/scripts/drupal content:export taxonomy_term 40 > recipes/my_recipe/content/taxonomy_term/some-tag.yml`

As of [#3532951: Support exporting content and its dependencies to a folder structure on disk](https://www.drupal.org/project/drupal/issues/3532951), you can also export the entity to a directory:

```php
php core/scripts/drupal content:export node 42 --dir=my-content
```

This will create `my-content/node/UUID_OF_NODE_42.yml`.

You can export the entity and all of its referenced entities, recursively, to a directory:

```php
php core/scripts/drupal content:export node 42 --with-dependencies --dir=content
```

This will export the content to a directory called `content`, divided by entity type into additional subdirectories. It's similar to the `drush dcer` command, from the contrib Default Content module.

It is possible to export all entities of a particular type, optionally filtered by bundle. For example, to export all `blog` content:

```php
php core/scripts/drupal content:export node --bundle=blog --with-dependencies --dir=content
```

Or multiple bundles, by passing the `--bundle` option more than once:

```php
php core/scripts/drupal content:export node --bundle=blog --bundle=faculty --with-dependencies --dir=content
```

You can leave out the `--bundle` option entirely to just export all entities of a particular type:

```php
php core/scripts/drupal content:export media --dir=content
```

### How to integrate with the API

The export command supports core field types, but modules that provide their own field types may need to write a little code to integrate with this command.

You can attach a callback to a particular field type (or a particular field) by writing an event subscriber that listens to `\Drupal\Core\DefaultContent\PreExportEvent`, which is dispatched before an entity is exported. The subscriber should call the event's `setCallback()` method, which takes either a field name or a field type (such as `field_item:image` -- if using a field type, the `field_item:` prefix must be present), and a callback that takes two arguments: the field item being exported (`\Drupal\Core\FieldItemInterface`) and an object that collects information about the entity being exported (`\Drupal\Core\DefaultContent\ExportMetadata`). It should return the exported values for that field item, or NULL if the item shouldn't be exported.

For examples, see the following classes:

- `\Drupal\Core\DefaultContent\Exporter`
- `\Drupal\link\EventSubscriber\DefaultContentSubscriber`

The event can also be used to opt a specific field out of being exported:

```php
$event->setExportable('field_name', FALSE);
```

Computed fields are not exported by default, but you can use that same method to opt them in:

```php
$event->setExportable('some_computed_field', TRUE);
```

### How to use the API

You can export an entity programmatically using the new `Exporter` service:

```php
use Drupal\Core\DefaultContent\Exporter;

$node = Node::load(32);
$exporter = \Drupal::service(Exporter::class);
$exported_content_as_yaml = (string) $exporter->export($node);

// Export to a file: creates /path/to/content/directory/node/UUID.yml.
$exporter->exportToFile($node, '/path/to/content/directory');

// Export to a directory with all dependencies, divided into subdirectories.
$exporter->exportWithDependencies($node, '/path/to/content');
```

*Source: [\`content:export\` command added to help with recipe development](https://www.drupal.org/node/3533854), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
