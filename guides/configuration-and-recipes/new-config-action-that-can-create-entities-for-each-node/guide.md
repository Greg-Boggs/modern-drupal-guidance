---
name: new-config-action-that-can-create-entities-for-each-node
title: "New config action that can create entities for each node type, media type, etc."
description: "New config action that can create entities for each node type, media type, etc."
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3481714
change-record-nid: 3481714
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3464550](https://www.drupal.org/node/3464550)

[#3464550: Create config action which can create an entity for every bundle of another entity type](https://www.drupal.org/project/drupal/issues/3464550) added a pair of new config actions, `createForEach` and `createForEachIfNotExists`, which can be used to loop over bundle config entities -- node types, media types, taxonomy vocabularies, and so forth -- to create other config entities that are coupled to those bundles.

A classic use case is making every content type translatable. This requires creating a `language.content_settings.node.TYPE` entity for each node type. Previously, there was no way to do this with recipes or config actions. Now, you can do this:

```php
config:
  actions:
    node.type.*:
      createForEach:
        language.content_settings.node.%bundle:
          target_entity_type_id: node
          target_bundle: %bundle
```

In this config action, the `%bundle` placeholder will be replaced with the ID of the node type being processed. For example, when processing a `blog` node type, it will create a corresponding `language.content_settings.node.blog` entity.

Let's say you want to create content settings *and* an image style for each content type. You can use `createForEach` to create multiple entities at once:

```php
config:
  actions:
    node.type.*:
      createForEachIfNotExists:
        language.content_settings.node.%bundle:
          target_entity_type_id: node
          target_bundle: %bundle
        image.style.node_%bundle_thumbnail:
          label: 'Thumbnail for %label content'
```

For a `blog` content type, this will create both a `language.content_settings.node.blog` entity and an `image.style.node_blog_thumbnail`. In the array *values* (but not the keys) you can use the `%label` placeholder to insert the human-readable label of the bundle being processed.

Each derived entity is created exactly the same way the `createIfNotExists` and `create` actions do it -- you just provide an array of values to create the entity with. These actions will handle preexisting entities with the same ID the same way that the `createIfNotExists` and `create` actions do.

*Source: [New config action that can create entities for each node type, media type, etc.](https://www.drupal.org/node/3481714), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
