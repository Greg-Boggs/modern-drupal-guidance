---
name: json-apis-handling-of-reference-fields-was-changed-to
title: "JSON:API's handling of reference fields was changed to support referencing by UUID or revision ID"
description: "JSON:API's handling of reference fields was changed to support referencing by UUID or revision ID"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3519887
change-record-nid: 3519887
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3476224](https://www.drupal.org/node/3476224)

Before 11.2 when updating an entity with a reference field via JSON:API the target entity would be set to the main property of the reference field, which generally is `target_id`. To support, for example, the use case of [Entity Reference UUID](https://www.drupal.org/project/entity_reference_uuid) this was changed to instead set the (computed) `entity` property. Having this (computed) property was already a requirement for reference fields so the only added assumption is that setting that property leads to the correct value being synchronized to the `target_id` property (or the `target_uuid` property in the case of Entity Reference UUID).

So to work with JSON:API any custom entity reference implementation must ensure that doing `$item->entity = $target_entity;` leads to the correct value being stored in the non-computed property (or properties). This also improves the developer experience for usage outside of JSON:API.

*Source: [JSON:API's handling of reference fields was changed to support referencing by UUID or revision ID](https://www.drupal.org/node/3519887), a Drupal core change record by [tstoeckler](https://www.drupal.org/user/107158) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
