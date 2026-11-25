---
id: cr-memory-cache-bin
title: Request-scoped memoization through core's memory cache bin
kind: code
guides: [new-cache-memory-cache-bin-replaces-cache-static]
---

Create a module called `bench_memo` in `web/modules/custom` and turn it on. `square($n)` on `bench_memo.squares` returns n squared. Pretend that working out a square is expensive: remember each result for the rest of the current request only, never across requests, under the cache ID `bench_memo:square:<n>` with the cache tag `bench_memo`, so that invalidating that tag later in the same request forgets them.
