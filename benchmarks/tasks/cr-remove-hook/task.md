---
id: cr-remove-hook
title: Remove another module's help text
kind: code
guides: [hook-implementations-can-now-be-removed-with-a-removehook, oop-hooks]
---

Create a module called `bench_nohelp` in `web/modules/custom` and turn it on. We don't want the Announcements module's help text anywhere on the site. We still use Announcements, so it must stay installed and unchanged. Help from other modules must keep working.
