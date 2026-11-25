---
id: cr-batch-set-once
title: Add a batch set only once per request
kind: code
guides: [new-methods-added-to-batchbuilder-to-prevent-batch-sets]
---

Create a module called `bench_onceb` in `web/modules/custom` and turn it on. Several parts of the site may ask for a search index rebuild during the same request by calling `queue()` on `bench_onceb.queuer`. Each call should add a batch job titled `Rebuild index` with one step to the current request's batch, but only once: however many times `queue()` is called in a request, the job is added a single time. Give the batch set the ID `bench_onceb_rebuild` so other code can recognise it.
