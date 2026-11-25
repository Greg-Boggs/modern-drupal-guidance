---
id: cr-block-cache-optional
title: Cheap per-URL block without its own render cache entries
kind: code
guides: [block-plugins-can-now-implement-cacheoptionalinterface, cache-metadata]
---

Create a module called `bench_where` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_where_path`, listed for admins as `You are here`) that shows `You are at: ` followed by the current path, for example `You are at: /node/1`. The block is so cheap to build that saving a separate cached copy of it for every path wastes more space than it saves, so Drupal should not keep cached copies of this block on its own. The pages that show it must still be cached.
