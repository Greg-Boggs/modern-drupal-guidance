---
id: cr-bundle-list-cache-tags
title: Latest articles block with precise cache invalidation
kind: code
guides: [new-entitytype-getbundlelistcachetags-method, cache-metadata]
---

Create a module called `bench_latest` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_latest_articles`, listed for admins as `Latest articles`) that lists the titles of the three newest published articles. When an article is added, changed or deleted, the block must show it straight away. Changes to other content types, such as basic pages, must not throw away the block's cached copy.
