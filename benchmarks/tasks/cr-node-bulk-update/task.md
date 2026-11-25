---
id: cr-node-bulk-update
title: Unpublish all nodes of a content type
kind: code
guides: [node-mass-update-is-deprecated]
---

Create a module called `bench_bulk` in `web/modules/custom` and turn it on. `unpublishType($type)` on `bench_bulk.updater` unpublishes every node of that content type immediately, in one go and without a progress-bar batch, however many there are. Nodes of other types must not change.
