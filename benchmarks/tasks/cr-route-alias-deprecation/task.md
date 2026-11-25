---
id: cr-route-alias-deprecation
title: Rename a route and keep the old name working
kind: code
guides: [added-support-for-route-aliases-and-deprecation]
---

Create a module called `bench_shop` in `web/modules/custom` and turn it on. Add a page at `/bench-shop` (title `Shop`, open to everyone, showing `Welcome to the shop.`) with the route name `bench_shop.catalog`. Its route used to be called `bench_shop.list`, and other modules still link to that name. Keep those links working, but warn their developers that the old name is deprecated: package `drupal/bench_shop`, since version `1.1.0`, with a message pointing them to `bench_shop.catalog`.
