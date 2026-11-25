---
name: the-block-content-add-list-theme-template-is-deprecated
title: "The block_content_add_list theme template is deprecated"
description: "The block_content_add_list theme template is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3530643
change-record-nid: 3530643
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3346394](https://www.drupal.org/node/3346394)

The `block_content_add_list` theme hook and template are deprecated. You can use `entity_add_list` instead.

Before:

```php
// Where $types is a list of BlockContentType entities.
$build = ['#theme' => 'block_content_add_list', '#content' => $types];
```

After:

```php
// Where $bundles is an associative array keyed by the bundle machine name, with an array of values with keys label, description, and add_link. 
$build = [
  '#theme' => 'entity_add_list',
  '#bundles' => $bundles,
];
```

See `\Drupal\Core\Entity\Controller\EntityController::addPage`\
[https://git.drupalcode.org/project/drupal/-/blob/11.x/core/lib/Drupal/Co...](https://git.drupalcode.org/project/drupal/-/blob/11.x/core/lib/Drupal/Core/Entity/Controller/EntityController.php#L151)

*Source: [The block_content_add_list theme template is deprecated](https://www.drupal.org/node/3530643), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
