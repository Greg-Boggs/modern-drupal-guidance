---
name: not-providing-an-attribute-class-for-a-plugin-that-uses
title: "Not providing an attribute class for a plugin that uses annotation based discovery is now deprecated"
description: "Not providing an attribute class for a plugin that uses annotation based discovery is now deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3522776
change-record-nid: 3522776
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3265945](https://www.drupal.org/node/3265945), [#3577900](https://www.drupal.org/node/3577900)

Plugin types that use annotations for discovery can provide an attribute class since Drupal 10.2.

Not providing an attribute class is now deprecated, and an attribute class will be required in Drupal 12.0. It is and will still be possible to also provide an annotation class for BC until Drupal 13, only then will support for annotations be removed completely.

See [Plugin types should use PHP attributes instead of annotations](https://www.drupal.org/node/3395582) and [Plugin implementations should use PHP attributes instead of annotations](https://www.drupal.org/node/3395575) for more information.

*Source: [Not providing an attribute class for a plugin that uses annotation based discovery is now deprecated](https://www.drupal.org/node/3522776), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
