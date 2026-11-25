---
id: cr-entity-operation-cacheability
title: Permission-gated node operation with correct cacheability
kind: code
guides: [entity-operations-methods-can-now-add-cacheable-metadata, oop-hooks]
---

Create a module called `bench_ops` in `web/modules/custom` and turn it on. Add a permission `view bench report` (title `View bench report`). On the content overview, the operations menu of every node should get a `Report` link (key `bench_report`) to the node's page, but only for users with that permission. The overview is cached, so users with and without the permission must never see each other's version of the menu.
