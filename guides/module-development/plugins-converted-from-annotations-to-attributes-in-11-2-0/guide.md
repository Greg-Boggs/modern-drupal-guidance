---
name: plugins-converted-from-annotations-to-attributes-in-11-2-0
title: "Plugins converted from Annotations to Attributes in 11.2.0"
description: "Plugins converted from Annotations to Attributes in 11.2.0"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3505424
change-record-nid: 3505424
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3421014](https://www.drupal.org/node/3421014), [#3009349](https://www.drupal.org/node/3009349)

This change was reverted before the release of 11.2.0

The following plugins now use Attributes. The change notice announcing the use of attributes for plugins is [Plugin implementations should use PHP attributes instead of annotations](https://www.drupal.org/node/3395575).

| `\Drupal\migrate\Annotation\MigrateSource` | `\Drupal\migrate\Attribute\MigrateSource` |
| --- | --- |

#### Exception

Classes that extend `\Drupal\migrate_drupal\Plugin\migrate\source\DrupalSqlBase` still use annotations (`\Drupal\migrate\Annotation\MigrateSource` instead of `\Drupal\migrate\Attribute\MigrateSource`).

#### Related

[Plugins converted from Annotations to Attributes in 11.1.0](https://www.drupal.org/node/3505422)\
[Plugins converted from Annotations to Attributes in 10.3.0](https://www.drupal.org/node/3229001)

*Source: [Plugins converted from Annotations to Attributes in 11.2.0](https://www.drupal.org/node/3505424), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
