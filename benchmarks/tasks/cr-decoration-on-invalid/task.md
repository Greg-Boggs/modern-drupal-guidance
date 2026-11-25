---
id: cr-decoration-on-invalid
title: Optional service decorator
kind: code
guides: [service-decoration-behaviour-can-be-controlled-with]
---

Create a module called `bench_decor` in `web/modules/custom` and turn it on. When the Ban module is in use, we want every IP ban logged. Add `bench_decor.ban_logger`, which wraps Ban's `ban.ip_manager`, logs each ban and passes every call on to it. Ban is not installed on this site and may never be: the module must install and the site must keep working without Ban, and in that case the logger should simply not exist.
