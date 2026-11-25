---
name: entity-type-plugins-converted-from-annotations-to
title: "Entity type plugins converted from Annotations to Attributes in 11.1.0"
description: "Entity type plugins converted from Annotations to Attributes in 11.1.0"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3505422
change-record-nid: 3505422
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3396166](https://www.drupal.org/node/3396166)

The following plugins now use Attributes. The change notice announcing the use of attributes for plugins is [Plugin implementations should use PHP attributes instead of annotations](https://www.drupal.org/node/3395575).

| `\Drupal\Core\Entity\Annotation\ConfigEntityType` | `\Drupal\Core\Entity\Attribute\ConfigEntityType` |
| --- | --- |
| `\Drupal\Core\Entity\Annotation\ContentEntityType` | `\Drupal\Core\Entity\Attribute\ContentEntityType` |
| `\Drupal\Core\Entity\Annotation\EntityType` | `\Drupal\Core\Entity\Attribute\EntityType` |

#### Related

[Plugins converted from Annotations to Attributes in 10.3.0](https://www.drupal.org/node/3229001)

*Source: [Entity type plugins converted from Annotations to Attributes in 11.1.0](https://www.drupal.org/node/3505422), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
