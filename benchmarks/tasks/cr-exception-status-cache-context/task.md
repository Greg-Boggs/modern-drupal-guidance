---
id: cr-exception-status-cache-context
title: Error-page hint block with a cheap cache context
kind: code
guides: [new-exception-status-code-cache-context, cache-metadata]
---

Create a module called `bench_errhint` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_errhint`, listed for admins as `Error hint`) that shows `Try the search page.` on "access denied" (403) and "page not found" (404) pages, and nothing on normal pages. Put it in the Content region of the Olivero theme. Bots request thousands of missing URLs, so the block must not be cached separately for every URL: one cached copy per kind of page (normal, 403, 404) is enough.
