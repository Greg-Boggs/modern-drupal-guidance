---
id: cr-initial-preprocess
title: Theme hook with a preprocess callback on a hook class
kind: code
guides: [template-preprocess-hook-are-defined-as-callbacks-in-the, template-preprocess-hook-and-the-file-and-includes-keys-in, oop-hooks]
---

Create a module called `bench_badge` in `web/modules/custom` and turn it on. Add a reusable badge that other code renders as `bench_badge`, passing a `label` (empty by default) and a `color` (`grey` by default). Its template, `templates/bench-badge.html.twig`, outputs `<span class="{{ classes }}">{{ label }}</span>`, and the module works out `classes` as `badge badge--<color>`.
