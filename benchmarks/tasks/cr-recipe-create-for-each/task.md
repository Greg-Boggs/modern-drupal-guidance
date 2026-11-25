---
id: cr-recipe-create-for-each
title: Recipe that configures every content type
kind: site-building
guides: [new-config-action-that-can-create-entities-for-each-node]
---

Write a recipe in `recipes/bench_lang_all` that turns on core's Language module and lets editors choose the language of each node, for every content type that exists when the recipe is applied. The recipe must not name content types: it has to work unchanged on sites with other content types. Apply it to this site.
