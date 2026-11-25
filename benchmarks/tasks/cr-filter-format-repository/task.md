---
id: cr-filter-format-repository
title: Text formats an account may use
kind: code
guides: [new-repository-service-for-filter-formats-filter-formats]
---

Create a module called `bench_formats` in `web/modules/custom` and turn it on. Provide `bench_formats.lister` with two methods: `formatIds($account)` returns the IDs of the text formats that account may use, in the order Drupal lists them, and `defaultFormatId($account)` returns the ID of that account's default text format.
