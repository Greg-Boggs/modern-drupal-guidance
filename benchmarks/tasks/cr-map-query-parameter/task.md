---
id: cr-map-query-parameter
title: Controller argument from a query parameter
kind: code
guides: [query-parameters-can-be-mapped-directly-to-controller]
---

Create a module called `bench_greet` in `web/modules/custom` and turn it on. Add a page at `/bench-greet` (title `Greeting`, open to everyone) that shows `Hello, <name>!` using the `name` in the address, so `/bench-greet?name=Ann` shows `Hello, Ann!`, and `Hello, guest!` when there is no name. Every visitor must see their own name, even when the page is cached.
