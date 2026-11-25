---
id: cr-sdc-variants
title: Single-directory component with named variants
kind: code
guides: [added-component-variants-to-sdc, single-directory-components]
---

Create a module called `bench_sdc` in `web/modules/custom` and turn it on. It provides a reusable component `callout` (ID `bench_sdc:callout`) with a `message` text input. Our designers want two variants of it: `info` (titled `Information`) and `warning` (titled `Warning`, described as `Use for problems the reader must act on.`). It outputs `<div class="callout callout--<variant>">{{ message }}</div>`, with `callout--info` when no variant is chosen.
