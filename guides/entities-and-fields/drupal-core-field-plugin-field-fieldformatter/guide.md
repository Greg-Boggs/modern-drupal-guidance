---
name: drupal-core-field-plugin-field-fieldformatter
title: "\\Drupal\\Core\\Field\\Plugin\\Field\\FieldFormatter\\EntityReferenceEntityFormatter::RECURSIVE_RENDER_LIMIT and ::$recursiveRenderDepth are deprecated"
description: "\\Drupal\\Core\\Field\\Plugin\\Field\\FieldFormatter\\EntityReferenceEntityFormatter::RECURSIVE_RENDER_LIMIT and ::$recursiveRenderDepth are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3316878
change-record-nid: 3316878
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2940605](https://www.drupal.org/node/2940605)

Both `\Drupal\Core\Field\Plugin\Field\FieldFormatter\EntityReferenceEntityFormatter::RECURSIVE_RENDER_LIMIT` and `\Drupal\Core\Field\Plugin\Field\FieldFormatter\EntityReferenceEntityFormatter::$recursiveRenderDepth` are deprecated.

A referenced entity can now be successfully re-rendered more than 20 times. Example use cases:

- Running batch search indexing on rendered content with the same media referenced by multiple indexed nodes.
- Rendering a node multiple times in a batch to be sent out as email newsletters.

Rendering recursion is now protected by tracking whether an entity is currently being rendered. This is done in `Drupal\Core\Entity\EntityViewBuilder`, where `#pre_render` and `#post_render` callbacks are added to the entity render array in `getBuildDefaults()`. These callbacks set and unset a tracking array entry indexed by the imploded cache keys of the render array for the entity.

*Source: [\Drupal\Core\Field\Plugin\Field\FieldFormatter\EntityReferenceEntityFormatter::RECURSIVE_RENDER_LIMIT and ::$recursiveRenderDepth are deprecated](https://www.drupal.org/node/3316878), a Drupal core change record by [spokje](https://www.drupal.org/user/3386132) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
