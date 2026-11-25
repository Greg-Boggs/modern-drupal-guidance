---
name: drupal-node-nodestorage-revisionids-userrevisionids-and
title: "Drupal\\node\\NodeStorage::revisionIds, ::userRevisionIds, and ::countDefaultLanguageRevisions are deprecated"
description: "Drupal\\node\\NodeStorage::revisionIds, ::userRevisionIds, and ::countDefaultLanguageRevisions are deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3519187
change-record-nid: 3519187
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3396062](https://www.drupal.org/node/3396062)

All methods on `Drupal\node\NodeStorage` except `::clearRevisionsLanguage` are now deprecated, some functions have been replaced by entity queries and some have no replacement:

### NodeStorage::revisionIds

**Before:**

```php
$revision_ids = $node_storage->revisionIds($node);
```

**After:**

```php
$query = \Drupal::entityQuery('node')->allRevisions()->condition('nid', $node->id())->accessCheck(FALSE);
$revision_ids = array_keys($query->execute());
```

### NodeStorage::userRevisionIds

**Before:**

```php
$revision_ids = $node_storage->userRevisionIds($account);
```

**After:**

```php
$query = \Drupal::entityQuery('node')->allRevisions()->accessCheck(FALSE)->condition('uid', $account->id());
$revision_ids = array_keys($query->execute());
```

### NodeStorage::countDefaultLanguageRevisions

Has been removed with no replacement. This was unused in Drupal core.

*Source: [Drupal\node\NodeStorage::revisionIds, ::userRevisionIds, and ::countDefaultLanguageRevisions are deprecated](https://www.drupal.org/node/3519187), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
