---
name: getdependencies-and-setdependencies-methods-have-been-added
title: "getDependencies() and setDependencies() methods have been added to Drupal\\Component\\Plugin\\Attribute\\AttributeInterface"
description: "getDependencies() and setDependencies() methods have been added to Drupal\\Component\\Plugin\\Attribute\\AttributeInterface"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3523753
change-record-nid: 3523753
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2786355](https://www.drupal.org/node/2786355)

Two new methods `getDependencies()` and `setDependencies()` have been added to `Drupal\Component\Plugin\Attribute\AttributeInterface`.

Plugin discovery by PHP attributes now uses Reflection to determine what dependencies the plugin class has, based on the class hierarchy. These dependencies include the fully qualified class names of all the ancestor classes the class extends, all the interfaces the class implements, and all the traits used by the class and its ancestor classes. From there, providers (in other words, modules) for the classes, interfaces, and traits are derived.

These dependencies are passed into the attribute object during discovery so that they can be made available in plugin definitions. `getDependencies()` and `setDependencies()` work with arrays that are indexed by the type of dependency (`class`, `interface`, `trait`, or `provider`). The values for each type are the fully qualified names, except for `provider` dependencies, which are the just the providers' machine names. Though generally in plugin processing, only the provider dependencies are passed into the attribute object.

For a plugin whose definition is an array `$definition`, the provider dependencies are available via the `$definition['dependencies']['provider']` if any dependencies are set. Plugin types that use object definitions will need ways to access the dependencies to be implemented as needed.

*Source: [getDependencies() and setDependencies() methods have been added to Drupal\Component\Plugin\Attribute\AttributeInterface](https://www.drupal.org/node/3523753), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
