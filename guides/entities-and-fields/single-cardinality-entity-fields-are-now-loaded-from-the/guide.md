---
name: single-cardinality-entity-fields-are-now-loaded-from-the
title: "Single cardinality entity fields are now loaded from the database at once"
description: "Single cardinality entity fields are now loaded from the database at once"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3562172
change-record-nid: 3562172
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3551308](https://www.drupal.org/node/3551308), [#3564689](https://www.drupal.org/node/3564689)

Single and multiple cardinality entity fields are now loaded from the database in two database queries, instead of a query per field.

This can reduce the number of database queries on a page by tens or hundreds; depending on the number of fields being loaded, and the number of different entity load calls on the page.

Note that this change means that more data is loaded from the database at once. In extreme situations, either when loading many thousands of entities in one go, or if entities have very large blob fields, e.g. large amounts of text, this could cause queries that would previously be within MySQL's `max_allowed_packet` (which defaults to 32MB for the MySQL server) limit to exceed it.

Should this happen, it's recommended to avoid loading an unbounded or very high number of entities at once. Instead you should ensure that views or entity queries always have a limit. For bulk operations, entities should be loaded in chunks, e.g. see e.g. `entity_update_batch_size`. These approaches ensure that both PHP and MySQL memory usage remains within reasonable constraints. If you have control over MySQL configuration, it is also possible to increase `max_allowed_packet` temporarily before making code changes.

*Source: [Single cardinality entity fields are now loaded from the database at once](https://www.drupal.org/node/3562172), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
