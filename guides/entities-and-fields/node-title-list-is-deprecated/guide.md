---
name: node-title-list-is-deprecated
title: "node_title_list is deprecated"
description: "node_title_list is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3531959
change-record-nid: 3531959
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3531953](https://www.drupal.org/node/3531953)

This is a procedural function in node.module that was previously used by statistics and forum modules. It is no longer used by Drupal core.

To replicate the functionality, you can do the following:

```php
    $nodes = \Drupal::entityTypeManager()->getStorage('node')->loadMultiple($nids);

    $items = [];
    foreach ($nids as $nid) {
      $node = \Drupal::service('entity.repository')->getTranslationFromContext($nodes[$nid]);
      $item = $node->toLink()->toRenderable();
      $this->renderer->addCacheableDependency($item, $node);
      $items[] = $item;
    }

    return [
      '#theme' => 'item_list__node',
      '#items' => $items,
      '#title' => $title,
      '#cache' => [
        'tags' => \Drupal::entityTypeManager()->getDefinition('node')->getListCacheTags(),
      ],
    ];
```

*Source: [node_title_list is deprecated](https://www.drupal.org/node/3531959), a Drupal core change record by [virag.jain](https://www.drupal.org/user/3840647) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
