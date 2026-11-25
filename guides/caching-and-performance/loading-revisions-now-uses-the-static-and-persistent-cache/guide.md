---
name: loading-revisions-now-uses-the-static-and-persistent-cache
title: "Loading revisions now uses the static and persistent cache like"
description: "Loading revisions now uses the static and persistent cache like"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3553211
change-record-nid: 3553211
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2620980](https://www.drupal.org/node/2620980)

Loading revisions now uses the cache if the entity type is configured to do so.

This has the following implications for calls to load(), loadMultiple(), loadRevision() and loadRevisionMultiple():

1. #### Better performance

   Loading the same revision multiple times during the same request returns the same object from the static cache and on following requests, will return it from the persistent cache, resulting in fewer queries being executed.

   The following is now true, which was a not the case before.

   ```php
   $storage = \Drupal::entityTypeManager()->getStorage('node');
   assert($storage->loadRevision(1) === $storage->loadRevision(1));
   ```

2. #### Loading an entity by ID also puts it in the revision static cache (but not the persistent cache)

   Loading a revisionable entity by ID also makes it available in the static cache when loading it by its revision ID. This is not true for the persistent cache due to the performance cost of writing to the persistent cache (cache tags).

   Because the revision is then already in the static cache, calling loadRevision() will also not put that revision into the persistent cache on the same request.

   The following is now true, which was the not the case before.

   ```php
   $storage = \Drupal::entityTypeManager()->getStorage('node');
   $node = $storage->load(1);
   assert($node === $storage->loadRevision($node->getRevisionId()));
   ```

3. #### Loading a revision does not put the entity into the regular static cache

   The reverse is not true. Loading a revision does not put into the static cache for the entity ID, since there are cases where a different revision than the default is loaded, such as workspaces:

   ```php
   $storage = \Drupal::entityTypeManager()->getStorage('node');
   $revision = $storage->loadRevision(1);
   assert($revision === $storage->load($revision->id()));
   ```

Subclasses of ContentEntityStorageBase may need some adjustments to benefit from this, implementations of ContentEntityStorageInterface that do not extend from ContentEntityStorageBase must implement loadRevisionUnchanged() now.

*Source: [Loading revisions now uses the static and persistent cache like](https://www.drupal.org/node/3553211), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
