---
id: cr-processed-text
title: Filter text into a cacheable render array
kind: code
guides: [the-check-markup-function-is-deprecated, cache-metadata]
---

Create a module called `bench_text` in `web/modules/custom` and turn it on. `format($text)` on `bench_text.formatter` returns the text filtered through the Basic HTML text format (`basic_html`), as an array Drupal can render, so the output updates when the format's settings change.
