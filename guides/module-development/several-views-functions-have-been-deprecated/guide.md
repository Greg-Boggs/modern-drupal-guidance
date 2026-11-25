---
name: several-views-functions-have-been-deprecated
title: "Several Views functions have been deprecated"
description: "Several Views functions have been deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3572594
change-record-nid: 3572594
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3572243](https://www.drupal.org/node/3572243)

The following views functions have been deprecated.

Many functions have a trivial OOP replacement. Function to get the current view have been deprecated without replacement. Relying on a global current view is unreliable when fibers and caching is involved. As a possible alternative, when rendering entities within a view, it may be possible to use $entity->view. However, this will also not automatically provide the necessary cache contexts and is discouraged and may be removed in the future as well. Whenever possibly, rendered entities should only vary based on their view mode.

- views_view_is_enabled
- views_view_is_disabled
- views_enable_view
- views_disable_view
- views_embed_view
- views_set_current_view
- views_get_current_view
- views_get_view_result
- \_views_query_tag_alter_condition
- views_element_validate_tags

| Before | After |
| --- | --- |
| views_view_is_enabled | $view->status() |
| views_view_is_disabled | !$view->status() |
| views_enable_view | $view->enable()->save() |
| views_disable_view | $view->disable()->save() |
| views_embed_view | `[ '#type' => 'view', '#name' => $name, '#display_id' => $display_id, '#arguments' => $args, ]` |
| views_get_view_result | Views::getViewResult($name, $display_id, ...$args) |
| views_set_current_view | No replacement |
| views_get_current_view | No replacement |
| \_views_query_tag_alter_condition | No replacement |
| views_element_validate_tags | No replacement |

*Source: [Several Views functions have been deprecated](https://www.drupal.org/node/3572594), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
