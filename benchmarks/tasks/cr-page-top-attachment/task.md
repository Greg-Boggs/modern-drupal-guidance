---
id: cr-page-top-attachment
title: Controller that adds markup to the top of the page
kind: code
guides: [page-top-and-page-bottom-can-now-be-added-using-attachments]
---

Create a module called `bench_banner` in `web/modules/custom` and turn it on. Add a page at `/bench-banner` (title `Banner demo`, open to anonymous visitors) whose main content is `Main content here.` On that page only, show `Site-wide notice: maintenance tonight.` at the very top of the page, before the site header and outside the main content.
