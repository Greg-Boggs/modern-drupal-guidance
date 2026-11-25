---
id: code-plugin-attributes
title: Configurable greeting block plugin
kind: code
guides: [plugin-attributes, module-development]
---

Create a module called `bench_block` in `web/modules/custom` and turn it on. It adds a greeting block (internal ID `bench_greeting`, listed for admins as `Bench greeting`). By default the block shows `Hello from the benchmark`. When admins configure the block they get one text field, Greeting, and once they save a greeting the block shows it instead. Put the block in the Content region of the Olivero theme so it shows on every page.
