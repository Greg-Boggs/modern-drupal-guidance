---
id: cr-link-suggestions-terms
title: Offer tags as CKEditor link suggestions
kind: code
guides: [a-new-entity-links-filter-format-and-ckeditor-5-plugin-has, oop-hooks]
---

When editors add a link in the text editor, the link dialog suggests site content as they type, but never tags. Create a module called `bench_termlinks` in `web/modules/custom` and turn it on. Terms from the `tags` vocabulary should be suggested too. Other vocabularies and other kinds of things on the site must stay as they are.
