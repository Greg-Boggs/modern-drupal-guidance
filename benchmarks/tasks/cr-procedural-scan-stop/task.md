---
id: cr-procedural-scan-stop
title: Keep helper functions from being read as hooks
kind: code
guides: [hooks-converted-parameter-and-stopproceduralhookscan, oop-hooks]
---

Create a module called `bench_helpers` in `web/modules/custom` and turn it on. Its `bench_helpers.module` file holds plain helper functions, including `bench_helpers_help()`, which returns `Helper text.`, and `bench_helpers_cron_label()`, which returns `Nightly`. None of them are hooks, but Drupal mistakes `bench_helpers_help()` for the module's help text. Keep both functions where they are, under their names, and make Drupal stop treating anything in that file as a hook.
