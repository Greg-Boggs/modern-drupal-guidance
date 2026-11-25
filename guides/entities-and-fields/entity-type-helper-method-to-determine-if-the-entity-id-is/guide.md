---
name: entity-type-helper-method-to-determine-if-the-entity-id-is
title: "Entity type helper method to determine if the entity ID is integer"
description: "Entity type helper method to determine if the entity ID is integer"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3566814
change-record-nid: 3566814
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3566801](https://www.drupal.org/node/3566801)

A new EntityTypeInterface helper method has been introduced that allows to check if the entity ID is an integer. This was necessary because we are doing this check in a lot of point in the site...

```php
  /**
   * Checks if this entity type has an integer ID.
   *
   * @return bool|null
   *   Returns:
   *     - TRUE if the entity type ID is defined as integer;
   *     - FALSE if the entity type ID is defined as string;
   *     - NULL if the entity type lacks an ID key.
   */
  public function hasIntegerId(): ?bool;
```

Other changes:

- `DefaultHtmlRouteProvider::getEntityTypeIdKeyType()` is deprecated. Even this is a protected method, there is a big chance that it's used by 3rd-parties extending DefaultHtmlRouteProvider, so we prefer to deprecate it instead of a simple remove.
- `\Drupal\comment\CommentTypeForm::entityTypeSupportsComments()` is deprecated.
- `_comment_entity_uses_integer_id()` is deprecated

*Source: [Entity type helper method to determine if the entity ID is integer](https://www.drupal.org/node/3566814), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
