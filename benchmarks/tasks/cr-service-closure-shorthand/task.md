---
id: cr-service-closure-shorthand
title: Service that receives a lazy service closure
kind: code
guides: [added-support-for-as-a-shorthand-for-service-closure-in]
---

Create a module called `bench_lazy` in `web/modules/custom` and turn it on. `bench_lazy.counter`, of the class `Drupal\bench_lazy\Counter`, has `nodeCount()`, which returns the number of nodes. The counter is created on many requests but rarely used, so it must not load the entity type manager until `nodeCount()` runs: its constructor receives a closure that returns the entity type manager.
