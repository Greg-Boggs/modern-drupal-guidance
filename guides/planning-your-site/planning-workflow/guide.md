---
name: planning-workflow
title: "Concept: Editorial Workflow"
description: "Overview of the editorial workflow to manage content on a website."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/planning-workflow.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Prerequisite knowledge

* {{ GUIDE_REF("understanding-drupal") }}
* {{ GUIDE_REF("planning-data-types") }}
## What is an editorial workflow?

An _editorial workflow_ is the process organizations follow to create, review,
edit, and publish content. Multiple people in different roles in the
organization can be part of the process. For example, content creators could
collect information and write content; editors could review, edit, ask for
changes, and publish the content once it's ready to be shared with the
audience. Later on, content revisions could go through a simple process for
small changes, or a more complex process with reviews for larger changes.
## What tools are available for managing workflows?

- **Published/Unpublished status:** The Content item entity type supports marking each content item as either Published or Unpublished. Viewing permissions are separate for published and unpublished content; for example, all site visitors might be able to see published content items, while only content creators and editors can see unpublished content items.
- **Revision tracking:** Some content entity types support revision tracking, meaning that as content is revised, the software stores the older revisions, so that they can be compared or reverted.
- **Workflows:** The core Workflows module lets you define workflow states and transitions, beyond just having content be published or unpublished. The companion core Content Moderation module lets you assign permissions and roles to the workflow transitions. Both can be used with both Content item and Custom block entity types.
- **Block placement:** The Custom block content entity lets you create a custom block and edit it, but only make it visible on the site once it is ready.
## Related topics

* {{ GUIDE_REF("content-create") }}
* {{ GUIDE_REF("content-edit") }}
* {{ GUIDE_REF("block-create-custom") }}
* {{ GUIDE_REF("block-place") }}

*Attributions*

Written and edited by [Diána Lakatos](https://www.drupal.org/u/dianalakatos) at
[Pronovix](https://pronovix.com//),
[Grant Dunham](https://www.drupal.org/u/gdunham),
and [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon).

*Source: [Concept: Editorial Workflow](https://www.drupal.org/docs/user_guide/en/planning-workflow.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
