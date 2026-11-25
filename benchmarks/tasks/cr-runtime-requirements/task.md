---
id: cr-runtime-requirements
title: Status report check for a missing API key
kind: code
guides: [added-hook-runtime-requirements-and-hook-runtime, drupal-requirements-severity-and-requirement-severity, hook-requirements-deprecated-in-favor-of-separate-runtime]
---

Create a module called `bench_req` in `web/modules/custom` and turn it on. On the site's status report (`/admin/reports/status`) it adds an entry with the key `bench_req_api_key` and the title `Bench API key`. When the site state value `bench_req.api_key` is empty, the entry is a warning with the value `Not configured` and a description telling the admin to set it; when it is set, the entry is OK with the value `Configured`.
