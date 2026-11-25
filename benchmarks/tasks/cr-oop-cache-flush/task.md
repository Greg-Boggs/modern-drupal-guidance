---
id: cr-oop-cache-flush
title: Count cache flushes from a hook class
kind: code
guides: [drupal-supports-several-additional-hook-implementations, oop-hooks]
---

Create a module called `bench_flush` in `web/modules/custom` and turn it on. Every time all of Drupal's caches are cleared (for example with `drush cache:rebuild`), add 1 to the value `bench_flush.count` in site state.
