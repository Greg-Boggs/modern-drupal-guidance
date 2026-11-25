---
id: cr-batch-callback-service
title: Batch operations on an injected service
kind: code
guides: [batch-api-callbacks-now-support-callables-supported-by-the, dependency-injection]
---

Create a module called `bench_batch` in `web/modules/custom` and turn it on. We need a job that runs in three steps through Drupal's batch processing (the progress bar). Each step adds 1 to the value `bench_batch.count` in site state, and when the job finishes it sets `bench_batch.done` to TRUE. Our admin tools get the job from `bench_batch.counter`: its `buildBatch()` returns the job definition as an array ready to hand to Drupal's batch system. Keep the step and finish code in `bench_batch.counter` itself.
