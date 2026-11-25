---
id: cr-entity-type-attribute
title: Minimal content entity type
kind: code
guides: [entity-type-plugins-converted-from-annotations-to, plugin-attributes]
---

Create a module called `bench_note` in `web/modules/custom` and turn it on. We need a simple Note record stored in the site's database: type ID `bench_note`, label `Note`, database table `bench_note`, with an ID, a UUID and a required `title` text field that serves as its label. Use Drupal's standard storage and access handling. Saving a note and loading it again must work as soon as the module is installed.
