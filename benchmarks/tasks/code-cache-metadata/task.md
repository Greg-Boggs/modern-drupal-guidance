---
id: code-cache-metadata
title: Cached published-article counter block
kind: code
guides: [cache-metadata, plugin-attributes, caching-and-performance]
---

Create a module called `bench_cache` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_article_count`, listed for admins as `Article count`) that shows `Published articles: N`, where N is the number of published articles. Put the block in the Sidebar region of the Olivero theme. When an article is published or unpublished, anonymous visitors must see the new number right away, without anyone clearing caches. The site must stay fast: pages with the block must still be cached for anonymous visitors.
