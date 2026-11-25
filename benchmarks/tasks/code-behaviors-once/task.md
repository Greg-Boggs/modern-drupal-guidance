---
id: code-behaviors-once
title: Badge behavior that runs once per element
kind: code
guides: [behaviors-and-once, front-end-javascript]
---

Create a module called `bench_js` in `web/modules/custom` and turn it on. On every front-end page, add a small "New" label, the markup `<span class="bench-badge">New</span>`, at the end of each element with the class `node__content`. Some of that content is loaded into the page later without a full page reload, so do it in the browser with a script. Every one of those elements must end up with exactly one label, including the ones that arrive later.
