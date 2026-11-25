---
name: file-get-file-references-is-deprecated-in-favor-of-the
title: "file_get_file_references() is deprecated in favor of the FileReferenceResolver"
description: "file_get_file_references() is deprecated in favor of the FileReferenceResolver"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3573884
change-record-nid: 3573884
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#1452100](https://www.drupal.org/node/1452100)

file_get_file_references() and file_field_find_file_reference_column() have been deprecated.

Replacing file_get_file_references() requires a review of the information below to understand the historical bugs and features fixed with this change. file_field_find_file_reference_column() has no replacement.

The file_get_file_references() function had bugs around usages in non-default revisions and very confusing DX with multiple arguments that needed to be set to a non-default value to get at least partially working results.

The function by default only returned usages of file fields (and not image and possibly others) and it didn't return anything if the use only existed on a non-default revision of an entity (either old or pending revisions), which meant that private files on those revisions were not accessible to users that should have access to them. Even if explicitly asked to return revisions with the use of the FIELD_LOAD_REVISION $age parameter.

The new API will yield FileReferenceUsage value objects instead of returning nested arrays. It will always and automatically return non-default revisions if the usage is not found on the default revision and exists on another. Only a single revision is returned for each entity, with the assumption that access does not vary between revisions, the user either has access to all or none.

There are some safeguards in place to limit the performance cost in edge cases, specifically the API will not return more than 50 non-default revisions per entity type. This is extremely unlikely to reach, as private files are rarely reused directly on many entities. It would also only result in users not having access if they do not have access to any of those first 50 entity revisions. Like before, no limit is put on the number of default revisions that are returned.

The existing API function does not call the new API due to fundamental API changes and the bug is not fixed, the new API must be used to support non-default revisions correctly.

### Before

```php
     if ($references = file_get_file_references($file, NULL, EntityStorageInterface::FIELD_LOAD_REVISION, NULL)) {
        foreach ($references as $field_name => $entity_map) {
          foreach ($entity_map as $referencing_entities) {
            /** @var \Drupal\Core\Entity\EntityInterface $referencing_entity */
            foreach ($referencing_entities as $referencing_entity) {
              $entity_and_field_access = $referencing_entity->access('view', $account, TRUE)->andIf($referencing_entity->$field_name->access('view', $account, TRUE));
              if ($entity_and_field_access->isAllowed()) {
                return $entity_and_field_access;
              }
            }
          }
       }
    }
```

### After

```php
      $resolver = \Drupal::service(FileReferenceResolver::class);
      foreach ($resolver->getReferences($entity) as $usage) {
        $has_references = TRUE;
        $referencing_entity = $resolver->loadEntityFromUsage($usage);

        // Either check view or revision access depending on this being a
        // default revision or not.
        if ($referencing_entity instanceof RevisionableInterface && !$referencing_entity->isDefaultRevision()) {
          $entity_and_field_access = $referencing_entity->access('view revision', $account, TRUE);
        }
        else {
          $entity_and_field_access = $referencing_entity->access('view', $account, TRUE);
        }

        // If access to that entity is allowed, check field access as well,
        // if access is still allowed, return this result.
        if ($entity_and_field_access->isAllowed()) {
          $entity_and_field_access = $entity_and_field_access->andIf($referencing_entity->get($usage->fieldName)->access('view', $account, TRUE));
          if ($entity_and_field_access->isAllowed()) {
            return $entity_and_field_access;
          }
        }
      }
```

Notes:

- The API changes only apply to custom usages of directly verifying file references, for the purpose of access checks or something else. Default private file routes now work out of the box with non-default revisions as well as when using `$file->access('download')`, no changes are necessary to benefit from the bugfix
- When using references for the purpose of access checks, the caller is responsible to check whether the entity is a default revision or not and check the appropriate access operation. The new implementation additionally optimizes the access check to only check field access if entity access is allowed, which results in some extra complexity
- Note: This does not address more complex use cases where private files are used by intermediate entity types such as medias, which in turn may be used by many other entities. Drupal core will continue to evaluate access only to the entity directly referencing the file. See [#2984093: Inform users that media items don't inherit access control from parents](https://www.drupal.org/project/drupal/issues/2984093)
- If results really should be limited to a specific file type, then the caller is responsible to check that in the loop with `$referencing_entity->getFieldDefinition($usage->fieldName)->getType()`

*Source: [file_get_file_references() is deprecated in favor of the FileReferenceResolver](https://www.drupal.org/node/3573884), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
