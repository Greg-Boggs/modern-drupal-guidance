---
id: cr-editor-for-format
title: Look up the editor of a text format
kind: code
guides: [editor-load-is-deprecated]
---

Create a module called `bench_editorinfo` in `web/modules/custom` and turn it on. Other code needs to know which editor a text format uses. Provide `bench_editorinfo.lookup`, whose `editorFor($format_id)` returns the ID of the editor configured for that text format (for example `ckeditor5`), or NULL when the format has no editor.
