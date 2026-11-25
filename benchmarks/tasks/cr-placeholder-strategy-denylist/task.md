---
id: cr-placeholder-strategy-denylist
title: Lazy notice block that BigPipe must not stream
kind: code
guides: [new-placeholder-strategy-denylist-key-for-render-arrays, lazy-builders]
---

Create a module called `bench_notice` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_notice_banner`, listed for admins as `Maintenance notice`) that shows `Scheduled maintenance on Sunday.` The notice will soon show live data, so it must always be filled in separately from the cached page around it, with the text built by a static method on the block's class. It is tiny and on every page, though, so it must never be streamed in late by BigPipe; any other way of filling it in is fine.
