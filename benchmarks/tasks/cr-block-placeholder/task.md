---
id: cr-block-placeholder
title: Always-placeholdered statistics block
kind: code
guides: [new-blockplugininterface-createplaceholder-method, lazy-builders]
---

Create a module called `bench_stats` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_stats_count`, listed for admins as `Content count`) that shows `Published content: N`, where N is the number of published nodes. The number has to update whenever content is saved, and right now every save would throw away the cached copy of every page that shows the block. Pages must keep their cached copy, and only this block should be worked out again, whatever cache information the block carries. Keep the block itself cacheable.
