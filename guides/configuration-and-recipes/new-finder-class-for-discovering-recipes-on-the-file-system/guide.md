---
name: new-finder-class-for-discovering-recipes-on-the-file-system
title: "New finder class for discovering recipes on the file system"
description: "New finder class for discovering recipes on the file system"
drupal-core: ">=12.1"
source-url: https://www.drupal.org/node/3626917
change-record-nid: 3626917
introduced-in-version: "12.1.0"
introduced-in-branch: "12.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.1.x\
Introduced in version: 12.1.0\
Issue links: [#3446354](https://www.drupal.org/node/3446354)

A new class, `\Drupal\Core\Recipe\Finder`, is added for discovering recipes on the file system.

By default, the Finder searches the directory configured by Composer for `drupal-recipe` packages and the core recipes directory. It returns `\Drupal\Core\Recipe\Recipe` objects for the recipes it discovers.

Module developers who need to discover available recipes no longer need to implement their own recipe discovery logic.

Basic usage:

```php
use Drupal\Core\Recipe\Finder;

$finder = new Finder();

foreach ($finder as $recipe) {
  echo $recipe->name;
}
```

The directories to search can be customized by passing a directory or an array of directories to the constructor.

```php
$finder = new Finder(
  directory: 'some/path',
);
```

By default, invalid recipes cause an exception. Callers that are discovering recipes for display or other cases where invalid recipes should be ignored can set `skipInvalid` to true.

Because the recipe Finder extends Symfony's Finder, its filtering methods can be used to further limit discovery. For example:

```php
$finder = new Finder();
$finder->notPath('example/');
```

This allows callers such as Project Browser, Drupal CMS, and contributed modules to use a common recipe discovery API while applying filters appropriate to their use case.

Calling a new `Finder()` without specifying a directory assumes the project has a Composer-configured recipe installation directory. Projects without one should either specify the directories to search or handle the resulting `\RuntimeException`.

*Source: [New finder class for discovering recipes on the file system](https://www.drupal.org/node/3626917), a Drupal core change record by [nedjo](https://www.drupal.org/user/4481) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
