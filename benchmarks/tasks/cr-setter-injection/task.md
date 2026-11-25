---
id: cr-setter-injection
title: Controller with setter injection
kind: code
guides: [autowiretrait-supports-setter-injection-with-the-required, dependency-injection]
---

Create a module called `bench_setter` in `web/modules/custom` and turn it on. Add a page at `/bench-time` (title `Time`, open to everyone) that shows `Request time: <unix timestamp>`, the time at which Drupal received the current request.
