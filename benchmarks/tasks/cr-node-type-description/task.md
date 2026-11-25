---
id: cr-node-type-description
title: Content type description of a node type
kind: code
guides: [node-type-get-description-is-deprecated]
---

Create a module called `bench_typedesc` in `web/modules/custom` and turn it on. `description($type)` on `bench_typedesc.helper` returns the description of the content type with that machine name, or an empty string when it has none.
