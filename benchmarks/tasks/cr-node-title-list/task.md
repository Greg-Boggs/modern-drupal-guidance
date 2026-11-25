---
id: cr-node-title-list
title: Render a list of linked node titles
kind: code
guides: [node-title-list-is-deprecated, cache-metadata]
---

Create a module called `bench_titles` in `web/modules/custom` and turn it on. `build($nids, $title = '')` on `bench_titles.builder` returns a renderable list of links to those nodes, in the order given, each showing the node's title in the current language, with `$title` as the list's heading. The list must refresh when any of those nodes changes.
