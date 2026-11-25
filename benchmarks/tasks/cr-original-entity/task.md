---
id: cr-original-entity
title: Log title changes on node update
kind: code
guides: [new-methods-to-access-original-unchanged-entity-during, oop-hooks]
---

Create a module called `bench_retitle` in `web/modules/custom` and turn it on. When someone edits a node and changes its title, keep a record of the old and new title: add the line `<old title> -> <new title>` to the list kept in site state under `bench_retitle.log`. Saving a node without changing its title, or creating a new node, must not add a line.
