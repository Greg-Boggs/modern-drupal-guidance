---
name: editor-load-is-deprecated
title: "editor_load() is deprecated"
description: "editor_load() is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3509245
change-record-nid: 3509245
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3447794](https://www.drupal.org/node/3447794)

### Before

`$editor = editor_load($format_id);`

### After (procedural/static)

`$editor = \Drupal\editor\Entity\Editor::load($format_id);`

### After (with dependency injection)

```php
public function __construct(
  protected readonly EntityTypeManagerInterface $entityTypeManager,
) {}
...

    $editor = $this->entityTypeManager->getStorage('editor')->load($format_id);
...
```

### EditorManager constructor change

Additionally, not passing the `$entityTypeManager` service to the `Drupal\editor\Plugin\EditorManager` constructor is deprecated. This parameter will be mandatory in Drupal 12.0.0.

*Source: [editor_load() is deprecated](https://www.drupal.org/node/3509245), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
