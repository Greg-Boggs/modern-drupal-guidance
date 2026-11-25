---
id: cr-cache-delete-all
title: Empty a custom cache bin completely
kind: code
guides: [cachebackendinterface-invalidateall-is-deprecated]
---

Create a module called `bench_reports` in `web/modules/custom` and turn it on. It keeps report data in a cache of its own, available as `cache.bench_reports`. Other code saves reports with `save($cid, $data)` on `bench_reports.store`, which stores the array in that cache, and empties the cache with `reset()`. After `reset()`, nothing saved before may come back, not even for code that asks for expired or invalidated items.
