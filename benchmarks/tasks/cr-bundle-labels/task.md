---
id: cr-bundle-labels
title: List content type labels
kind: code
guides: [node-type-get-names-is-deprecated]
---

Create a module called `bench_types` in `web/modules/custom` and turn it on. Our reporting code needs the names of all content types. Make them available as `bench_types.lister`, whose `nodeTypeNames()` returns every content type's name keyed by its machine name, for example `['article' => 'Article', 'page' => 'Basic page']`. Content types added later must show up too.
