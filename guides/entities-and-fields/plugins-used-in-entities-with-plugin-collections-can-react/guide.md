---
name: plugins-used-in-entities-with-plugin-collections-can-react
title: "Plugins used in entities with plugin collections can react when the entities' dependencies are removed"
description: "Plugins used in entities with plugin collections can react when the entities' dependencies are removed"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3549101
change-record-nid: 3549101
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2579743](https://www.drupal.org/node/2579743)

When a configurtion entity implementing `EntityWithPluginCollectionInterface` is reacting to dependency removal, it iterates through all the plugins in the plugin collection to check whether any plugin implements `Drupal\Core\Plugin\RemovableDependentPluginInterface`, and if so, invokes the plugin's `onCollectionDependencyRemoval()` method, so that the plugin can react to the dependency removal as well. Implementations of `onCollectionDependencyRemoval()` can be used to update the configuration of the plugin itself and notify the entity to recalculate its dependencies and/or remove the plugin from entity's plugin collection. This can prevent the entity from being unnecessarily deleted on dependency removal if the change to the plugin configuration or the removal of the plugin results in the entity no longer having the dependencies.

`onCollectionDependencyRemoval()` returns a Drupal\Core\Plugin\RemovableDependentPluginReturn enum that has one of three values:

- `RemovableDependentPluginReturn::Changed` if the configuration of the plugin instance has changed
- `RemovableDependentPluginReturn::Remove` if the plugin instance should be removed from the plugin collection
- `RemovableDependentPluginReturn::Unchanged` if the configuration of the plugin instance has not changed.

For example, the `Drupal\image\Entity\ImageStyle` configuration entity type has a collection of `Drupal\image\ImageEffectInterface` plugins. Image effect plugin classes that extend `Drupal\image\ImageEffectBase` have this `onCollectionDependencyRemoval()` implementation that removes the plugin from the entity's collection if the module providing the plugin is uninstalled:

```php
  public function onCollectionDependencyRemoval(array $dependencies): RemovableDependentPluginReturn {
    // If the module that provides the image effect plugin is uninstalled,
    // the plugin instance should be removed from the collection.
    return in_array($this->getPluginDefinition()['provider'], $dependencies['module'] ?? []) ? RemovableDependentPluginReturn::Remove : RemovableDependentPluginReturn::Unchanged;
  }
```

*Source: [Plugins used in entities with plugin collections can react when the entities' dependencies are removed](https://www.drupal.org/node/3549101), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
