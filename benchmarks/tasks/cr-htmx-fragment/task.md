---
id: cr-htmx-fragment
title: Swap in a fragment with core's declarative AJAX
kind: code
guides: [ajax-subsystem-now-includes-htmx, route-option-added-for-routes-designed-to-serve-htmx]
---

Create a module called `bench_quote` in `web/modules/custom` and turn it on. The page `/bench-quote` (title `Quote`, open to anonymous visitors) shows a box, `<div id="bench-quote">`, and a button labelled `Next quote`. Clicking the button loads `/bench-quote/next` into the box without reloading the page. `/bench-quote/next` returns `Quote: Simplicity is a prerequisite for reliability.` on its own, without the site's header, footer or other page regions, however it is requested. We don't want custom JavaScript files to maintain for this.
