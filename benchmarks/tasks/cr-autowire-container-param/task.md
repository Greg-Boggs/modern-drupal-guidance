---
id: cr-autowire-container-param
title: Controller that receives a container parameter
kind: code
guides: [autowiretrait-and-autowiredinstancetrait-support-container, dependency-injection]
---

Create a module called `bench_param` in `web/modules/custom` and turn it on. Add a page at `/bench-site-path`, titled `Site path` and open to everyone, that shows `Site path: <value>`, where the value is this site's directory as Drupal records it (for example `sites/default`).
