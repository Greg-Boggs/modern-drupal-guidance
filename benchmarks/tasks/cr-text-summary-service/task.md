---
id: cr-text-summary-service
title: Generate text summaries
kind: code
guides: [text-summary-is-deprecated-and-moved-to-new-textsummary]
---

Create a module called `bench_summary` in `web/modules/custom` and turn it on. `summarize($html, $size)` on `bench_summary.teaser` returns the summary Drupal would make from that HTML at that size, cutting at sentence or paragraph boundaries the same way the summary-or-trimmed display does, with no text format given.
