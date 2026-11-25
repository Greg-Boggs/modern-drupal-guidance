---
id: code-dependency-injection
title: Latest article service and route
kind: code
guides: [dependency-injection, module-development]
---

Create a module called `bench_di` in `web/modules/custom` and turn it on. Anyone allowed to view published content should be able to visit `/bench/latest-article` and see `Latest article: <title>` for the most recently created published article, or `No articles yet` when there is none. Other custom code on the site needs the same lookup, so make it reusable as `bench_di.latest_article`, with a method that returns that title, or NULL when there is no published article.
