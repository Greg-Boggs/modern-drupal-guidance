---
name: changeditem-does-not-update-timestamp-when-entity-is
title: "ChangedItem does not update timestamp when entity is synchronizing"
description: "ChangedItem does not update timestamp when entity is synchronizing"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3250104
change-record-nid: 3250104
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#2329253](https://www.drupal.org/node/2329253)

**Before**

```php
$node = Node::load(1337);
$changed_original = $node->getChangedTime();

$node->save();
$changed_current = $node->getChangedTime();

// $changed_current has a newer timestamp than $changed_original
```

**After**

The above is still true.

But if you indicate that the entity is *syncing* prior to saving it, then:

```php
$node = Node::load(1337);
$changed_original = $node->getChangedTime();

// If you indicate that you're updating an entity because you're *synchronizing* it
// (migrating, importing from another site, … whichever reason you have!):
$node->setSyncing(TRUE); // 👈

$node->save();
$changed_current = $node->getChangedTime();

// $changed_current STILL HAS THE SAME TIMESTAMP AS $changed_original 👈
```

*Source: [ChangedItem does not update timestamp when entity is synchronizing](https://www.drupal.org/node/3250104), a Drupal core change record by [wim leers](https://www.drupal.org/user/99777) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
