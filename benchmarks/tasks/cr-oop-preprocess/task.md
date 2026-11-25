---
id: cr-oop-preprocess
title: Node preprocessing in a hook class
kind: code
guides: [preprocess-functions-in-modules-now-support-object-oriented, oop-hooks]
---

Create a module called `bench_wordcount` in `web/modules/custom` and turn it on. When a node is shown in its full view, the `<article>` element that wraps it should carry `data-words="<N>"`, where N is the number of words in the node's title.
