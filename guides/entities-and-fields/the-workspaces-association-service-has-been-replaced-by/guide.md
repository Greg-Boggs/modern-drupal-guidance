---
name: the-workspaces-association-service-has-been-replaced-by
title: "The workspaces.association service has been replaced by workspaces.tracker"
description: "The workspaces.association service has been replaced by workspaces.tracker"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3551450
change-record-nid: 3551450
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3551446](https://www.drupal.org/node/3551446)

The `workspaces.association` service has been deprecated, and a new `workspaces.tracker` has been added.

Here's an overview of the deprecated and new interfaces in Drupal 11.3.0:

| WorkspaceAssociationInterface (deprecated) | WorkspaceTrackerInterface (replacement) |
| --- | --- |
| `trackEntity(RevisionableInterface $entity, WorkspaceInterface $workspace)` | `trackEntity(string $workspace_id, RevisionableInterface $entity): void` |
| `workspaceInsert(WorkspaceInterface $workspace)` | *Removed* |
| `getTrackedEntities($workspace_id, $entity_type_id = NULL, $entity_ids = NULL)` | `getTrackedEntities(string $workspace_id, ?string $entity_type_id = NULL, ?array $entity_ids = NULL): array` |
| `getTrackedEntitiesForListing($workspace_id, ?int $pager_id = NULL, int\|false $limit = 50): array` | `getTrackedEntitiesForListing(string $workspace_id, ?int $pager_id = NULL, int\|false $limit = 50): array` |
| `getAssociatedRevisions($workspace_id, $entity_type_id, $entity_ids = NULL)` | `getAllTrackedRevisions(string $workspace_id, string $entity_type_id, ?array $entity_ids = NULL): array` |
| `getAssociatedInitialRevisions(string $workspace_id, string $entity_type_id, array $entity_ids = [])` | `getTrackedInitialRevisions(string $workspace_id, string $entity_type_id, ?array $entity_ids = NULL): array` |
| `getEntityTrackingWorkspaceIds(RevisionableInterface $entity, bool $latest_revision = FALSE)` | `getEntityTrackingWorkspaceIds(RevisionableInterface $entity, bool $latest_revision = FALSE): array` |
| `moveTrackedEntities(string $source_workspace_id, string $target_workspace_id, ?string $entity_type_id = NULL, ?array $entity_ids = NULL): void` | `moveTrackedEntities(string $source_workspace_id, string $target_workspace_id, ?string $entity_type_id = NULL, ?array $entity_ids = NULL): void` |
| `deleteAssociations($workspace_id = NULL, $entity_type_id = NULL, $entity_ids = NULL, $revision_ids = NULL)` | `deleteTrackedEntities(?string $workspace_id = NULL, ?string $entity_type_id = NULL, ?array $entity_ids = NULL, ?array $revision_ids = NULL): void` |
| `initializeWorkspace(WorkspaceInterface $workspace)` | `initializeWorkspace(WorkspaceInterface $workspace): void` |

*Source: [The workspaces.association service has been replaced by workspaces.tracker](https://www.drupal.org/node/3551450), a Drupal core change record by [amateescu](https://www.drupal.org/user/729614) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
