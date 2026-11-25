---
id: cr-cache-prewarm
title: Catalog service that Drupal can warm ahead of requests
kind: code
guides: [new-cache-prewarm-api]
---

Create a module called `bench_catalog` in `web/modules/custom` and turn it on. `getItems()` on `bench_catalog.catalog` returns `['alpha', 'beta', 'gamma']`. Building that list is slow on the real site, so keep it in the `default` cache bin under the ID `bench_catalog:items`: return the cached copy when there is one, otherwise build it and store it. After caches are cleared we don't want the first visitor to wait, so Drupal's cache warm-up after a rebuild should be able to fill `bench_catalog:items` before any request asks for it.
