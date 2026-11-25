---
id: cr-library-font-preload
title: Preload a web font through a library
kind: code
guides: [library-definitions-now-support-a-fonts-key-for-preloading]
---

Create a module called `bench_fonts` in `web/modules/custom` and turn it on. It ships the font file `fonts/inter.woff2` (placeholder content is fine) in an asset library called `bench_fonts/typography`, used on every front-end page. The font appears late on slow connections, so the page head should tell browsers to start downloading it early (preload).
