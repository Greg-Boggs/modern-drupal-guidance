---
name: new-entitytype-getbundlelistcachetags-method
title: "New EntityType::getBundleListCacheTags() method"
description: "New EntityType::getBundleListCacheTags() method"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3512328
change-record-nid: 3512328
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3501508](https://www.drupal.org/node/3501508)

A getBundleListCacheTags() method was added to the `\Drupal\Core\Entity\EntityType` class.\
This method makes it easier to generate the ENTITY_TYPE_list:BUNDLE cache tag.

**Before**

```php
$tags[] = $this->getEntityTypeId() . '_list:' . $this->bundle();
```

**Now**

```php
$cache = new CacheableMetadata();
$cache->addCacheTags(\Drupal::entityTypeManager()->getDefinition('node')->getBundleListCacheTags('article'));
```

This will be invalidated when a node of type "article" is updated, removed or added.

*Source: [New EntityType::getBundleListCacheTags() method](https://www.drupal.org/node/3512328), a Drupal core change record by [prudloff](https://www.drupal.org/user/3611858) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
