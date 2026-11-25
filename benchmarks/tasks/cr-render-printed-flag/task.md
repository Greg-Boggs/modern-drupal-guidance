---
id: cr-render-printed-flag
title: Skip one child when rendering a render array
kind: code
guides: [render-control-functions-hide-and-show-are-deprecated]
---

Create a module called `bench_hidden` in `web/modules/custom` and turn it on. `build($showSecret)` on `bench_hidden.builder` returns a render array with three children keyed `intro` (`Welcome.`), `secret` (`Staff only.`) and `outro` (`Goodbye.`). When `$showSecret` is FALSE, the `secret` child must stay in the array, with its access setting untouched, because other code inspects it later, but it must not appear in the output. When `$showSecret` is TRUE, all three are shown.
