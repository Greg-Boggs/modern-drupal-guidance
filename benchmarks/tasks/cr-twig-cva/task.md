---
id: cr-twig-cva
title: Button template with class variants
kind: code
guides: [class-variance-authority-cva-support-added-to-twig]
---

Create a module called `bench_button` in `web/modules/custom` and turn it on. Add a button that other code renders as `bench_button`, passing `label`, `intent` (`primary` or `danger`, `primary` by default) and `size` (`sm` or `lg`, `sm` by default). Its template, `templates/bench-button.html.twig`, outputs a `<button>` whose classes are always `btn`, plus `btn--primary` or `btn--danger` for the intent and `btn--sm` or `btn--lg` for the size.
