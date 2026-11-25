---
name: entity-storage-entity-type-id-values-cache-tags-have-been
title: "Entity storage entity_type_id_values cache tags have been removed"
description: "Entity storage entity_type_id_values cache tags have been removed"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3505638
change-record-nid: 3505638
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3505059](https://www.drupal.org/node/3505059)

(Content) entity types share a common entity cache bin for their persistent cache tag.

Previously, each entity type automatically added a cache tag which allowed to invalidate the cache for just that entity type, such as node_values and user_values.

However, entity storage cache invalidation is transparent and a full cache clear for a specific entity type is almost never necessary except in edge cases (such as directly altering data in the tables) and tests (also rarely needed now, see [https://www.drupal.org/node/3491185](https://www.drupal.org/node/3491185)).

To avoid unnecessary several additional cache tags on most page requests, these cache tags have been removed. Calling resetCache() on an entity storage without any IDs will now invalidate the full entity cache bin.

If a specific entity type requires semi-frequent full cache invalidation then the responsible entity storage class can still add additional cache tags.

See more on how and why cache tags are being optimized and reduced in the following change record: [https://www.drupal.org/node/3505248](https://www.drupal.org/node/3505248)

*Source: [Entity storage entity_type_id_values cache tags have been removed](https://www.drupal.org/node/3505638), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
