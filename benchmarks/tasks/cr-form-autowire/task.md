---
id: cr-form-autowire
title: Form with constructor injection and no factory method
kind: code
guides: [formbase-provides-create-factory-method-with-autowired, dependency-injection]
---

Create a module called `bench_autoform` in `web/modules/custom` and turn it on. Add a form at `/bench-autoform` (form ID `bench_autoform`, open to everyone) that shows `Last saved: <value>`, where the value is the site state value `bench_autoform.last` (or `never` when it is empty), with a `note` text field and a `Save` button that stores the note in `bench_autoform.last`.
