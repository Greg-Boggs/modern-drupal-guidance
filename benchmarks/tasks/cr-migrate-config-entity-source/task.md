---
id: cr-migrate-config-entity-source
title: Migration that reads this site's config entities
kind: code
guides: [the-d8-config-migrate-source-plugin-is-replaced-by-the]
---

Create a module called `bench_cfgmig` in `web/modules/custom` and turn it on. Also turn on core's Migrate module, but not Migrate Drupal. The module contains a migration with the ID `bench_cfgmig_types` that reads the Article and Basic page content type settings (`node.type.article` and `node.type.page`) from this site's own active configuration, through its `default` database connection, maps each content type's label to `label`, and writes to the `null` destination, because for now we only want to try out the source.
