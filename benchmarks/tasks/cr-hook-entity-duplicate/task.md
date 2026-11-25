---
id: cr-hook-entity-duplicate
title: Adjust node duplicates when they are created
kind: code
guides: [new-hook-entity-duplicate-and-hook-entity-type-duplicate, oop-hooks]
---

Create a module called `bench_dup` in `web/modules/custom` and turn it on. When a node is duplicated (for example by code that copies a node for an editor), the copy, not the original, must get ` (copy)` added to its title and be unpublished straight away, before anyone saves it.
