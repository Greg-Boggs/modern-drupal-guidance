---
name: entity-type-definitions-can-now-optionally-provide-a-link
title: "Entity Type definitions can now optionally provide a \"link_target\" handler"
description: "Entity Type definitions can now optionally provide a \"link_target\" handler"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3350853
change-record-nid: 3350853
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3,x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3,x\
Introduced in version: 11.3.0\
Issue links: [#3317769](https://www.drupal.org/node/3317769)

The web is full of links. When creating content in Drupal, content creators often want to link to other entities in Drupal. Inside of Drupal's assistive text editor (CKEditor 4 previously, now 5) this has historically been a laborious manual process, with brittle results (risk of typos, copy/paste errors, link rot, and more).

To facilitate creating content that consistently links to entities of all types (`Node`, but also `File` and `Media`, and even `MenuLinkContent`), a new optional entity handler is introduced: the `link_target` handler:

```php
 *     "link_target" = {
 *       "view" = "\Drupal\menu_link_content\Entity\MenuLinkContentLinkTarget",
 *     },
```

(for an entity type that is not downloadable)

```php
 *   handlers = {
 *     "storage" = "Drupal\media\MediaStorage",
…
 *     "link_target" = {
 *       "view" = "\Drupal\media\Entity\MediaLinkTargetStandaloneWhenAvailable",
 *       "download" = "\Drupal\media\Entity\MediaLinkTarget",
 *     },
```

(for an entity type that is downloadable)

Such handlers must implement `\Drupal\Core\Entity\EntityLinkTargetInterface`, which has a single method:

```php
  /**
   * Gets the generated URL object for a linked entity's link target.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   A linked entity.
   *
   * @return \Drupal\Core\GeneratedUrl
   *   The generated URL plus cacheability metadata.
   */
  public function getLinkTarget(EntityInterface $entity): GeneratedUrl;
```

This allows links to a `File` entity (or to a `Media` entity using the `File` source plugin) to automatically be resolved to the underlying file, links to `Media` using the `OEmbed` source plugin to automatically be resolved to the originally embedded URL, and so on.

For example, `FileLinkTarget`:

```php
  public function getLinkTarget(EntityInterface $entity): GeneratedUrl {
    assert($entity instanceof FileInterface);
    $url = $entity->createFileUrl(TRUE);
    // The $url is a string, which provides no cacheability metadata.
    assert(is_string($url));
    return (new GeneratedUrl())
      ->setGeneratedUrl($url)
      // No path & route processing means permanent cacheability.
      ->setCacheMaxAge(Cache::PERMANENT);
  }
```

or `MenuLinkContentLinkTarget`:

```php
  public function getLinkTarget(EntityInterface $entity): GeneratedUrl {
    assert($entity instanceof MenuLinkContentInterface);
    return $entity->getUrlObject()->toString(TRUE);
  }
```

**See [the Change Record for the new Entity Links filter plugin](https://www.drupal.org/node/3524296) for where this is used.**

*Source: [Entity Type definitions can now optionally provide a "link_target" handler](https://www.drupal.org/node/3350853), a Drupal core change record by [wim leers](https://www.drupal.org/user/99777) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
