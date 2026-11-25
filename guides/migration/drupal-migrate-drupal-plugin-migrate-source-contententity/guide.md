---
name: drupal-migrate-drupal-plugin-migrate-source-contententity
title: "Drupal\\migrate_drupal\\Plugin\\migrate\\source\\ContentEntity been moved to the migrate module"
description: "Drupal\\migrate_drupal\\Plugin\\migrate\\source\\ContentEntity been moved to the migrate module"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3498916
change-record-nid: 3498916
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3498915](https://www.drupal.org/node/3498915)

The following classes have been deprecated.

- `Drupal\migrate_drupal\Plugin\migrate\source\ContentEntity`
- `Drupal\migrate_drupal\Plugin\migrate\source\ContentEntityDeriver`

**Before:**

```php
<?php
use Drupal\migrate_drupal\Plugin\migrate\source\ContentEntity;
?>
```

**After:**

```php
<?php
use Drupal\migrate\Plugin\migrate\source\ContentEntity;
?>
```

The source plugin ID `content_entity` is not changed, so any code that uses just the plugin ID will continue to work. This includes migration plugins.

**Exception**: If a site uses the `migrate` module but not the `migrate_drupal` module, and it also uses a custom or contrib module that already defines a `content_entity` source plugin, then that will cause a conflict.

Any code that uses the class (not just the plugin ID) will have to be updated.

*Source: [Drupal\migrate_drupal\Plugin\migrate\source\ContentEntity been moved to the migrate module](https://www.drupal.org/node/3498916), a Drupal core change record by [benjifisher](https://www.drupal.org/user/683300) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
